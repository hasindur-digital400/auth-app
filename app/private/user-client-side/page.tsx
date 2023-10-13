'use client'

import useAxiosAuth from '@/lib/hooks/useAxiosAuth'
import React, { useState } from 'react'

type Props = {}

export default function User({}: Props) {
  const axiosAuth = useAxiosAuth()
  const [userData, setUserData] = useState('')

  const retrieveUserData = async () => {
    const { data, status } = await axiosAuth.get('/auth/profile')

    if (status === 200) {
      setUserData(data)
    } else if (status === 401) {
      alert('Unauthorized - Sign in to view user details')
    } else {
      alert(`Error: ${status}`)
    }
  }

  // console.log('data: ', userData)

  return (
    <div>
      <h1 className='text-3xl font-bold mt-2'>User details - CSR page</h1>
      <p>This is a protected page</p>
      <div>
        {userData ? (
          <p>{JSON.stringify(userData)}</p>
        ) : (
          <button
            className='bg-blue-400 p-4 rounded'
            onClick={retrieveUserData}
          >
            Get user data
          </button>
        )}
      </div>
    </div>
  )
}
