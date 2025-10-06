import express from 'express'
import { asyncHandler } from '../middleware/error.js'

const router = express.Router()
router.post('/', asyncHandler(async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })
  console.log('Contact form:', { name, email, message }) // stub
  res.json({ ok: true })
}))
export default router
