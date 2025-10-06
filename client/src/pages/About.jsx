import React from 'react'
export default function About(){
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 prose dark:prose-invert">
      <h1>About Us</h1>
      <p><strong>Clean Metadata</strong> is a privacy-first toolkit for removing and editing metadata in your files.</p>
      <p>We process in temporary storage and delete immediately after your results are delivered.</p>
      <h2>How we work</h2>
      <ul>
        <li>Industry-standard tools: exiftool, ffmpeg, qpdf, ghostscript</li>
        <li>Lossless where possible (copy streams), no tracking</li>
        <li>500 MB file limit to keep things fast & safe</li>
      </ul>
    </div>
  )
}
