import React from 'react';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Creative from '../components/layout/Creative'


function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
     console.log("Helloooooo")
    const result = await login(email, password)

    console.log(result)

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

  {/* Right Section (Login Box) */}
  <div className="bg-white p-8 border border-gray-300 rounded-lg max-w-sm w-full text-center shadow-md">
    <h1 className="text-2xl font-semibold mb-6 italic text-gray-800">Instagram</h1>

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
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>

    <p className="mt-4 text-sm">
      Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
    </p>
  </div>
</div>

  )
}

export default LoginPage
