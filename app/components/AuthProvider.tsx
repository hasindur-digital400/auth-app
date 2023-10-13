'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import PersistSession from '@/app/components/PersistSession'

type Props = {
  children: ReactNode
}

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      <PersistSession>{children}</PersistSession>
    </SessionProvider>
  )
}
