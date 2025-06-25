import React from 'react';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Creative from '../components/layout/creative'


function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signup(name, email, password)

    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 px-6">
  {/* Left Section (Creative Component) */}
  <div className="hidden md:flex w-[45%] justify-center">
    <Creative />
  </div>

  {/* Right Section (Signup Box) */}
  <div className="bg-white p-8 border border-gray-300 rounded-lg max-w-sm w-full text-center shadow-md">
    <h1 className="text-2xl font-semibold mb-6 italic text-gray-800">Instagram</h1>
    <p className="text-gray-600 text-sm mb-6">Sign up to see photos and videos from your friends.</p>

    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-sm text-sm bg-gray-50 focus:outline-none focus:border-gray-500"
        required
      />

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-sm text-sm bg-gray-50 focus:outline-none focus:border-gray-500"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-sm text-sm bg-gray-50 focus:outline-none focus:border-gray-500"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="px-3 py-2 bg-blue-500 text-white border-0 rounded text-sm font-semibold mt-3 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>

    <p className="mt-4 text-sm">
      Have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
    </p>
  </div>
</div>

  )
}

export default SignupPage