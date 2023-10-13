'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

export default function SignIn({}: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [incorrectCredentials, setIncorrectCredentials] = useState(false)
  const [waiting, setWaiting] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setWaiting(true)

    const response = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    })

    if (response?.ok) {
      router.push('/')
    } else {
      setIncorrectCredentials(true)
      setWaiting(false)
    }
  }

  return (
    <div className='mt-12 flex flex-col gap-3 w-full items-center '>
      <form
        className='mt-12 flex flex-col gap-3 w-1/2 items-center shadow-md bg-lime-100 p-4'
        onSubmit={handleSubmit}
      >
        {incorrectCredentials && (
          <p className='p-3 bg-red-500 text-white rounded'>
            Incorrect credentials
          </p>
        )}
        <label htmlFor='email'>
          Email:
          <input
            type='text'
            id='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor='password'>
          Password:
          <input
            type='password'
            id='password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor='rememberMe'>
          Remember me:
          <input
            type='checkbox'
            id='rememberMe'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </label>
        <button
          type='submit'
          className='p-1 rounded bg-blue-300 disabled:bg-slate-400 disabled:cursor-not-allowed'
          disabled={waiting}
        >
          {waiting ? 'Waiting...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
