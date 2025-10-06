import multer from 'multer'
import os from 'os'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, os.tmpdir()),
  filename: (req, file, cb) => {
    const ext = (file.originalname.match(/\.[^.]+$/) || [''])[0]
    cb(null, 'cm-' + crypto.randomBytes(8).toString('hex') + ext)
  }
})

export const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
})
