import { useSession } from 'next-auth/react'
import axios from '@/lib/axios'

export default function useRefreshToken() {
  const { data: session, update } = useSession()

  const refreshToken = async () => {
    const { data, status } = await axios.post('/auth/refresh-token', {
      refreshToken: session?.refreshToken,
    })

    if (status === 201 && session) {
      update({
        refreshToken: data.refresh_token,
        accessToken: data.access_token,
      })
    }
  }

  return refreshToken
}
