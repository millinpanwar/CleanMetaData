import React, { useState } from 'react'
import api from '../lib/api.js'
export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const onChange = e => setForm(s => ({...s, [e.target.name]: e.target.value}))
  const submit = async e => {
    e.preventDefault(); setError('')
    try {
      const { data } = await api.post('/contact', form)
      if (data?.ok) setSent(true); else setError('Something went wrong.')
    } catch { setError('Unable to send your message right now.') }
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      {sent ? <p>Thanks! We received your message.</p> : (
        <form onSubmit={submit} className="grid gap-3 max-w-xl">
          <label className="grid gap-1"><span className="text-sm">Name</span><input name="name" value={form.name} onChange={onChange} className="px-3 py-2 rounded border bg-transparent" required/></label>
          <label className="grid gap-1"><span className="text-sm">Email</span><input type="email" name="email" value={form.email} onChange={onChange} className="px-3 py-2 rounded border bg-transparent" required/></label>
          <label className="grid gap-1"><span className="text-sm">Message</span><textarea name="message" value={form.message} onChange={onChange} className="px-3 py-2 rounded border bg-transparent" required/></label>
          <button className="px-4 py-2 rounded bg-blue-600 text-white">Send</button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      )}
    </div>
  )
}
