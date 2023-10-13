'use client'

import { ReactNode, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

type Props = {
  children: ReactNode
}

export default function PersistSession({ children }: Props) {
  const { data: session } = useSession()

  //   const handleUnload = (e: Win) => {
  //     // if (!session?.rememberMe) {
  //     //   signOut()
  //     // }
  //     e.preventDefault()
  //     console.log('close')
  //     alert('hi')
  //   }

  //   useEffect(() => {
  //     window.addEventListener('unload', handleUnload, true)

  //     return () => {
  //       window.removeEventListener('unload', handleUnload)
  //     }
  //   }, [])
  //   useBeforeunload((event) => {
  //     // event.preventDefault()
  //     signOut()
  //     // alert('dont close')
  //   })

  console.log('session from persistent session', session)
  return <>{children}</>
}
