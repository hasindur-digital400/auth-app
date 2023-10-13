import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from '@/lib/axios'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember me', type: 'checkbox' },
      },
      async authorize(credentials) {
        try {
          const { data, status } = await axios.post(
            '/auth/login',
            JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            })
          )

          if (status === 201) {
            return { ...data, rememberMe: credentials?.rememberMe }
          }
        } catch (error: any) {
          console.log('Error:', error?.message)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // access_token and refresh_token come from user argument passed
      // console.log('jwt token:', token)
      return { ...token, ...user }
    },

    async session({ session, token }) {
      // console.log('session:', session)
      // console.log('token:', token)
      const accessToken = token.access_token
      const refreshToken = token.refresh_token
      const rememberMe = Boolean(token.rememberMe)

      const { data, status } = await axios.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (status === 200) {
        const { id, name, email, role, avatar } = data

        return {
          ...session,
          user: { id, name, email, role, avatar },
          rememberMe,
          accessToken,
          refreshToken,
        }
      } else {
        console.log('Error:', status)
        return session
      }
    },
  },
  pages: {
    signIn: '/auth/sign-in',
  },
  session: {
    // Session will expire in 20 days because JWT expires in 20 days
    maxAge: 60 * 60 * 24 * 20,
  },
}

export default authOptions
