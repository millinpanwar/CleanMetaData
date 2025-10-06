import { spawn } from 'child_process'

export function runCmd(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], ...opts })
    let stdout = '', stderr = ''
    child.stdout.on('data', d => stdout += d.toString())
    child.stderr.on('data', d => stderr += d.toString())
    child.on('error', reject)
    child.on('close', code => {
      if (code === 0) resolve({ stdout, stderr })
      else {
        const err = new Error(`${cmd} exited with code ${code}: ${stderr || stdout}`)
        err.code = code
        reject(err)
      }
    })
  })
}
