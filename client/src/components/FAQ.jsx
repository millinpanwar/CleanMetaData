import React from 'react'

export default function FAQ() {
  const faqs = [
    { q: 'Do you keep my files?', a: 'No. Files are stored in temp only for processing and are deleted immediately after completion.' },
    { q: 'What\'s the max upload size?', a: '500 MB per file. Both client and server enforce this limit.' },
    { q: 'Which formats are supported?', a: 'Images (JPG/PNG/TIFF/WEBP), Videos (MP4/MOV/MKV/AVI/WebM), PDFs.' },
    { q: 'Will quality change?', a: 'We prefer lossless operations. For videos, we copy streams when possible to avoid re-encoding.' },
    { q: 'Is this open source?', a: 'This boilerplate is for your deployment. You can adapt it for your needs.' },
    { q: 'Is my data private?', a: 'Yes. We process on-the-fly and delete temp files. No analytics unless you add it.' },
  ]
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((f,i) => (
          <details key={i} className="border rounded">
            <summary className="cursor-pointer px-4 py-3 font-medium">{f.q}</summary>
            <div className="px-4 pb-4 text-neutral-700 dark:text-neutral-300">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  )
}
