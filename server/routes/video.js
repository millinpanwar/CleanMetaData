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
    const { stdout } = await runCmd('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', input])
    res.json(JSON.parse(stdout))
  } finally {
    await safeUnlinkAll([input])
  }
}))

router.post('/strip', upload.single('file'), asyncHandler(async (req, res) => {
  const input = req.file?.path
  if (!input) return res.status(400).json({ error: 'No file' })
  const ext = path.extname(req.file.originalname) || '.mp4'
  const out = path.join(os.tmpdir(), path.basename(input, ext) + '-cleaned' + ext)
  try {
    await runCmd('ffmpeg', ['-y', '-i', input, '-map', '0', '-map_metadata', '-1', '-c', 'copy', out])
    res.download(out, path.basename(out), async () => {
      await safeUnlinkAll([input, out])
    })
  } catch (e) {
    try {
      await runCmd('ffmpeg', ['-y', '-i', input, '-map', '0', '-map_metadata', '-1', '-c:v', 'libx264', '-c:a', 'aac', out])
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
