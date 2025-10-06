import express from 'express'
import { upload } from '../middleware/upload.js'
import { asyncHandler } from '../middleware/error.js'
import { runCmd } from '../utils/runCmd.js'
import { safeUnlinkAll } from '../utils/files.js'
import path from 'path'
import os from 'os'

const router = express.Router()

router.post('/inspect', upload.single('file'), asyncHandler(async (req, res) => {
  const input = req.file?.path
  if (!input) return res.status(400).json({ error: 'No file' })
  try {
    const { stdout } = await runCmd('qpdf', ['--json', input])
    res.json(JSON.parse(stdout))
  } finally {
    await safeUnlinkAll([input])
  }
}))

router.post('/strip', upload.single('file'), asyncHandler(async (req, res) => {
  const input = req.file?.path
  if (!input) return res.status(400).json({ error: 'No file' })
  const out = path.join(os.tmpdir(), path.basename(input, '.pdf') + '-cleaned.pdf')
  try {
    await runCmd('qpdf', ['--linearize', '--clear-metadata', input, out])
    res.download(out, path.basename(out), async () => {
      await safeUnlinkAll([input, out])
    })
  } catch (e) {
    try {
      await runCmd('gs', ['-o', out, '-sDEVICE=pdfwrite', '-dPDFSETTINGS=/prepress', '-dCompatibilityLevel=1.7',
        '-dNOPAUSE', '-dBATCH', '-dSAFER',
        '-c', '<</Producer() /Creator() /Title() /Author() /Subject() /Keywords()>> setdocinfo',
        '-f', input])
      res.download(out, path.basename(out), async () => {
        await safeUnlinkAll([input, out])
      })
    } catch (e2) {
      await safeUnlinkAll([input, out])
      throw e2
    }
  }
}))

export default router
