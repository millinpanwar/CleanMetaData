# clean-metadata-tool/server/Dockerfile
FROM node:20-bookworm-slim

# Install required system tools
RUN apt-get update && apt-get install -y --no-install-recommends     exiftool     ffmpeg     qpdf     ghostscript     ca-certificates &&     rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install server deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy server source
COPY . .

ENV NODE_ENV=production
# Render injects PORT; server reads it (default 8080)
CMD ["node", "index.js"]
