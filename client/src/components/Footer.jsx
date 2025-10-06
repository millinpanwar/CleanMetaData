import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">Clean Metadata</div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Privacy-first tools to inspect, clean, and edit file metadata. Files are processed in temp and deleted immediately after completion.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
        <div className="text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} Clean Metadata. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
