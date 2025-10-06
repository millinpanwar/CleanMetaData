import fs from 'fs/promises'
import os from 'os'
import path from 'path'

export function startSweeper() {
  setInterval(async () => {
    try {
      const dir = os.tmpdir()
      const entries = await fs.readdir(dir, { withFileTypes: true })
      const now = Date.now()
      for (const e of entries) {
        if (!e.isFile()) continue
        if (!e.name.startsWith('cm-')) continue
        const fp = path.join(dir, e.name)
        const stat = await fs.stat(fp)
        if (now - stat.mtimeMs > 30 * 60 * 1000) {
          await fs.unlink(fp).catch(()=>{})
        }
      }
    } catch {}
  }, 15 * 60 * 1000)
}
