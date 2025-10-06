import express from 'express'
import { upload } from '../middleware/upload.js'
import { asyncHandler } from '../middleware/error.js'
import { runCmd } from '../utils/runCmd.js'
import { safeUnlinkAll } from '../utils/files.js'
import path from 'path'
import fs from 'fs/promises'
import os from 'os'

const router = express.Router()

router.post('/strip', upload.single('file'), asyncHandler(async (req, res) => {
  const input = req.file?.path
  if (!input) return res.status(400).json({ error: 'No file' })
  const ext = path.extname(req.file.originalname) || ''
  const out = path.join(os.tmpdir(), path.basename(input, ext) + '-cleaned' + ext)
  try {
    await runCmd('exiftool', ['-overwrite_original', '-all=', input])
    await fs.copyFile(input, out)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.download(out, path.basename(out), async () => {
      await safeUnlinkAll([input, out])
    })
  } catch (e) {
    await safeUnlinkAll([input, out])
    throw e
  }
}))

export default router
