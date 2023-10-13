import { getServerSession } from 'next-auth/next'
import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import axios from '@/lib/axios'

type Props = {}

export default async function User({}: Props) {
  const session = await getServerSession(authOptions)

  const { data, status } = await axios.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  })

  let content

  if (status === 200) {
    content = data && <p>{JSON.stringify(data)}</p>
  } else if (status === 401) {
    content = (
      <div>
        <p className='text-lg font-bold'>Unauthorized</p>
        <p>Sign in to view user details</p>
      </div>
    )
  } else {
    content = <p>Error occurred: {status}</p>
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mt-2'>User details - SSR page</h1>
      <p>This is a protected page</p>
      <div>{content}</div>
    </div>
  )
}
