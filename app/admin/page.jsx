import { getServerSession } from 'next-auth'
import { authConfig } from '@/configs/authConfig'

const AdminPage = async () => {
  const session = await getServerSession(authConfig)
  return session?.user.role === 'ADMIN' ? (
    <p>You are an admin, welcome!</p>
  ) : (
    <p>You are not authorized to view this page!</p>
  )
}

export default AdminPage
