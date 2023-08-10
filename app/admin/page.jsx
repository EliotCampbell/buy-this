import { getServerSession } from 'next-auth'

const AdminPage = async () => {
  const session = await getServerSession()

  console.log(session)

  return session?.user.role === 'ADMIN' ? (
    <p>You are an admin, welcome!</p>
  ) : (
    <p>You are not authorized to view this page!</p>
  )
}

export default AdminPage
