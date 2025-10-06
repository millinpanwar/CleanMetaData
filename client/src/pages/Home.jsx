import React from 'react'
import { Link } from 'react-router-dom'
import HowItWorks from '../components/HowItWorks.jsx'
import FAQ from '../components/FAQ.jsx'

const tools = [
  { to: '/clean-image-metadata', t: 'Clean Metadata from Image', d: 'Strip EXIF/IPTC/XMP metadata safely.' },
  { to: '/remove-video-metadata', t: 'Remove Metadata from Video', d: 'Wipe container & stream tags via ffmpeg.' },
  { to: '/remove-photo-metadata', t: 'Remove Metadata from Photo', d: 'Dedicated photo cleaner (alias of image tool).' },
  { to: '/edit-metadata', t: 'Edit Metadata', d: 'Update basic tags like Title, Author, Keywords.' },
  { to: '/pdf-metadata-remover', t: 'PDF Metadata Remover', d: 'Clear PDF info (Title/Author/Subject/etc.).' },
]

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-transparent dark:from-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Clean file metadata in seconds</h1>
          <p className="text-neutral-700 dark:text-neutral-300 mb-6">Privacy-first. No tracking. We delete files immediately after processing.</p>
          <div className="flex justify-center gap-3">
            <Link to="/clean-image-metadata" className="px-4 py-2 rounded bg-blue-600 text-white">Clean Image</Link>
            <Link to="/remove-video-metadata" className="px-4 py-2 rounded border">Clean Video</Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t,i) => (
            <Link key={i} to={t.to} className="border rounded p-4 hover:shadow transition">
              <div className="font-semibold mb-1">{t.t}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.d}</div>
            </Link>
          ))}
        </div>
      </section>

      <HowItWorks />
      <FAQ />
    </>
  )
}
