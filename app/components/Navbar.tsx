'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

type Props = {}

export default function Navbar({}: Props) {
  const { data: session } = useSession()

  return (
    <nav className='flex justify-between items-center w-full py-10 px-5 bg-slate-400'>
      <div className='flex justify-between items-center gap-4 w-ful'>
        <Link href='/' className='text-2xl font-bold'>
          AuthApp
        </Link>
        <Link href='/public/products' className='font-bold'>
          Products
        </Link>
      </div>
      {session?.user ? (
        <>
          <Link
            href='/private/user-client-side'
            className='font-bold text-orange-400 bg-slate-500'
          >
            {session.user.name} - CSR
          </Link>
          <Link
            href='/private/user-server-side'
            className='font-bold text-orange-400 bg-slate-500'
          >
            {session.user.name} - SSR
          </Link>

          <button
            className='p-2 rounded-sm border'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Sign Out
          </button>
        </>
      ) : (
        <button className='p-2 rounded-sm border' onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </nav>
  )
}
