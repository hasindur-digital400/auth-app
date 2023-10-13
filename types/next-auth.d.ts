import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string
      email: string
      role: string
      avatar: string
    }
    accessToken: string
    refreshToken: string
    rememberMe: boolean
  }
}
