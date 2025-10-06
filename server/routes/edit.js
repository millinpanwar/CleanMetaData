import express from 'express'
import { upload } from '../middleware/upload.js'
import { asyncHandler } from '../middleware/error.js'
import { runCmd } from '../utils/runCmd.js'
import { safeUnlinkAll } from '../utils/files.js'
import path from 'path'
import os from 'os'
import fs from 'fs/promises'

const router = express.Router()

router.post('/image', upload.single('file'), asyncHandler(async (req, res) => {
  const input = req.file?.path
  if (!input) return res.status(400).json({ error: 'No file' })
  const { title='', artist='', copyright='', description='', keywords='' } = req.body || {}
  const ext = path.extname(req.file.originalname) || ''
  const out = path.join(os.tmpdir(), path.basename(input, ext) + '-edited' + ext)
  try {
    const args = ['-overwrite_original']
    if (title) args.push('-Title=' + title)
    if (artist) args.push('-Artist=' + artist)
    if (copyright) args.push('-Copyright=' + copyright)
    if (description) args.push('-Description=' + description)
    if (keywords) args.push('-Subject=' + keywords)
    args.push(input)
    await runCmd('exiftool', args)
    await fs.copyFile(input, out)
    res.download(out, path.basename(out), async () => {
      await safeUnlinkAll([input, out])
    })
  } catch (e) {
    await safeUnlinkAll([input, out])
    throw e
  }
}))

export default router
