import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import routes from './routes.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          {routes.map(r => <Route key={r.path} path={r.path} element={<r.component />} />)}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
