import fs from 'fs/promises'
export async function safeUnlink(p){ if (!p) return; try { await fs.unlink(p) } catch {} }
export async function safeUnlinkAll(paths){ for (const p of paths) await safeUnlink(p) }
