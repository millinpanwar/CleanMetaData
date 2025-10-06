import React from 'react'

export default function HowItWorks() {
  const steps = [
    { t: 'Upload', d: 'Drop your file into the secure dropzone.' },
    { t: 'Inspect', d: 'Preview existing metadata for transparency.' },
    { t: 'Clean / Edit', d: 'Strip or modify metadata using industry-standard tools.' },
    { t: 'Download', d: 'Grab your cleaned file. We auto-delete temp files.' },
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">How it works</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((s,i) => (
          <div key={i} className="border rounded p-4">
            <div className="font-semibold mb-1">{i+1}. {s.t}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
