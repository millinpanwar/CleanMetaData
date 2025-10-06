import React, { useState } from 'react'
import api from '../lib/api.js'
import { MAX_SIZE, IMAGE_ACCEPT } from '../lib/validators.js'
import FileDropzone from '../components/FileDropzone.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Toast from '../components/Toast.jsx'

export default function CleanImageMetadata() {
  const [file, setFile] = useState(null)
  const [meta, setMeta] = useState(null)
  const [progress, setProgress] = useState(0)
  const [toast, setToast] = useState('')

  const inspect = async f => {
    const form = new FormData()
    form.append('file', f)
    const { data } = await api.post('/image/inspect', form, {
      onUploadProgress: e => setProgress(Math.round((e.loaded / e.total) * 100) || 0)
    })
    setMeta(data)
  }

  const strip = async () => {
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    const res = await api.post('/image/strip', form, {
      responseType: 'blob',
      onUploadProgress: e => setProgress(Math.round((e.loaded / e.total) * 100) || 0)
    })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = (file.name.replace(/(\.[^.]*)$/, '')) + '-cleaned' + (file.name.match(/(\.[^.]*)$/)?.[0] || '')
    a.click()
    URL.revokeObjectURL(url)
    setToast('Cleaned file downloaded. Server copy deleted.')
    setTimeout(()=>setToast(''), 3000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Clean Metadata from Image</h1>
      <FileDropzone accept={IMAGE_ACCEPT} maxSizeBytes={MAX_SIZE} onFile={(f)=>{ if(f.size<=MAX_SIZE){ setFile(f); inspect(f).catch(console.error) } }}/>
      {progress>0 && <div className="my-4"><ProgressBar value={progress} /></div>}
      {meta && <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded overflow-auto text-xs mt-4">{JSON.stringify(meta, null, 2)}</pre>}
      <div className="mt-4">
        <button disabled={!file} onClick={strip} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">Strip Metadata</button>
      </div>
      <Toast msg={toast} type="success" />
    </div>
  )
}
