import React from 'react'

export default function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded">
      <div className="h-2 rounded bg-blue-500 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}
