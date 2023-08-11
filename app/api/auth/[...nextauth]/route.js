import NextAuth from 'next-auth'
import jwt from 'jsonwebtoken'
import { authConfig } from '@/configs/authConfig'
/*const sequelize = require('@/db')*/

/*sequelize.sync()*/

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
