import React, { useRef, useState } from 'react'

export default function FileDropzone({ accept, maxSizeBytes, onFile }) {
  const [hover, setHover] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFiles = files => {
    setError('')
    if (!files || !files.length) return
    const file = files[0]
    if (file.size > maxSizeBytes) {
      setError(`File exceeds limit ${(maxSizeBytes/1024/1024).toFixed(0)} MB.`)
      return
    }
    onFile(file)
  }

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setHover(true) }}
        onDragLeave={() => setHover(false)}
        onDrop={e => { e.preventDefault(); setHover(false); handleFiles(e.dataTransfer.files) }}
        className={'border-2 border-dashed rounded p-6 text-center cursor-pointer ' + (hover ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-transparent')}
        onClick={() => inputRef.current?.click()}
      >
        <p className="mb-2 font-medium">Drag & drop your file here</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">or click to browse</p>
      </div>
      <input ref={inputRef} type="file" className="hidden" accept={accept} onChange={e => handleFiles(e.target.files)} />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  )
}
