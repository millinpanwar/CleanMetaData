import React, { useState } from 'react'
import api from '../lib/api.js'
import { MAX_SIZE, IMAGE_ACCEPT } from '../lib/validators.js'
import FileDropzone from '../components/FileDropzone.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Toast from '../components/Toast.jsx'

export default function EditMetadata() {
  const [file, setFile] = useState(null)
  const [meta, setMeta] = useState(null)
  const [progress, setProgress] = useState(0)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ title:'', artist:'', copyright:'', description:'', keywords:'' })

  const inspect = async f => {
    const formData = new FormData()
    formData.append('file', f)
    const { data } = await api.post('/image/inspect', formData, {
      onUploadProgress: e => setProgress(Math.round((e.loaded / e.total) * 100) || 0)
    })
    setMeta(data)
  }

  const save = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    Object.entries(form).forEach(([k,v]) => formData.append(k, v))
    const res = await api.post('/edit/image', formData, { responseType: 'blob' })
    const url = URL.createObjectURL(res.data)
    const a = document.createElement('a')
    a.href = url
    a.download = (file.name.replace(/(\.[^.]*)$/, '')) + '-edited' + (file.name.match(/(\.[^.]*)$/)?.[0] || '')
    a.click()
    URL.revokeObjectURL(url)
    setToast('Updated file downloaded. Server copy deleted.')
    setTimeout(()=>setToast(''), 3000)
  }

  const onChange = e => setForm(s => ({ ...s, [e.target.name]: e.target.value }))

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Image Metadata</h1>
      <FileDropzone accept={IMAGE_ACCEPT} maxSizeBytes={MAX_SIZE} onFile={(f)=>{ if(f.size<=MAX_SIZE){ setFile(f); inspect(f).catch(console.error) } }}/>
      {progress>0 && <div className="my-4"><ProgressBar value={progress} /></div>}
      {meta && <pre className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded overflow-auto text-xs mt-4">{JSON.stringify(meta, null, 2)}</pre>}

      <div className="mt-6 border rounded p-4 grid gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1"><span className="text-sm">Title</span><input name="title" className="px-3 py-2 rounded border bg-transparent" value={form.title} onChange={onChange}/></label>
          <label className="grid gap-1"><span className="text-sm">Artist/Author</span><input name="artist" className="px-3 py-2 rounded border bg-transparent" value={form.artist} onChange={onChange}/></label>
        </div>
        <label className="grid gap-1"><span className="text-sm">Copyright</span><input name="copyright" className="px-3 py-2 rounded border bg-transparent" value={form.copyright} onChange={onChange}/></label>
        <label className="grid gap-1"><span className="text-sm">Description</span><textarea name="description" className="px-3 py-2 rounded border bg-transparent" value={form.description} onChange={onChange}/></label>
        <label className="grid gap-1"><span className="text-sm">Keywords (comma-separated)</span><input name="keywords" className="px-3 py-2 rounded border bg-transparent" value={form.keywords} onChange={onChange}/></label>
        <div><button onClick={save} disabled={!file} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">Save & Download</button></div>
      </div>
      <Toast msg={toast} type="success" />
    </div>
  )
}
