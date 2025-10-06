import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/clean-image-metadata', label: 'Clean Image' },
  { to: '/remove-video-metadata', label: 'Clean Video' },
  { to: '/remove-photo-metadata', label: 'Clean Photo' },
  { to: '/edit-metadata', label: 'Edit Metadata' },
  { to: '/pdf-metadata-remover', label: 'PDF Remover' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">Clean Metadata</Link>
        <nav className="hidden md:flex items-center gap-3">
          {nav.map(i => (
            <NavLink key={i.to} to={i.to} className={({isActive}) =>
              'px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 ' + (isActive ? 'font-semibold underline' : '')}>
              {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
