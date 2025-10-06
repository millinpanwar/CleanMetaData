# Clean Metadata Tool (React + Node) — Render Ready

Frontend: React 18 + Vite + Tailwind + React Router  
Backend: Node.js + Express + Multer + child_process (exiftool, ffmpeg/ffprobe, qpdf, ghostscript)  
Hard file size limit: **≤ 500 MB** (client + server)  
Immediate temp-file deletion after processing.

## Deploy on Render (Blueprint)
- Commit this repo to GitHub.
- In Render, use **Blueprint** with `render.yaml` in repo root.
- After deploy, set `CORS_ORIGIN` to your frontend domain and `VITE_API_URL` to your API URL if different.
