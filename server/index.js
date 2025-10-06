import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import imageRoutes from './routes/image.js'
import photoRoutes from './routes/photo.js'
import videoRoutes from './routes/video.js'
import pdfRoutes from './routes/pdf.js'
import editRoutes from './routes/edit.js'
import contactRoutes from './routes/contact.js'

import { startSweeper } from './utils/cleanup.js'

const app = express()
const PORT = process.env.PORT || 8080
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: ORIGIN }))
app.use(express.json({ limit: '1mb' }))

const limiter = rateLimit({ windowMs: 60_000, max: 120 })
app.use(limiter)

app.get('/api/health', (req,res)=> res.json({ ok: true, ts: Date.now() }))

app.use('/api/image', imageRoutes)
app.use('/api/photo', photoRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/pdf', pdfRoutes)
app.use('/api/edit', editRoutes)
app.use('/api/contact', contactRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Server error' })
})

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT)
  startSweeper()
})
