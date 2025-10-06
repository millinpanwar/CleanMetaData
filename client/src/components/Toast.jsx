import React from 'react'

export default function Toast({ msg, type='info' }) {
  if (!msg) return null
  const color = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-neutral-800'
  return (
    <div className={`${color} text-white px-4 py-2 rounded fixed bottom-4 right-4 shadow-lg`}>
      {msg}
    </div>
  )
}
