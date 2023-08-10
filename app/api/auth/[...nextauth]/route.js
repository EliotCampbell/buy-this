import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'
import { error } from 'next/dist/build/output/log'
import jwt from 'jsonwebtoken'

const generateJwt = (id, email, role = 'USER') =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        try {
          const { email, password } = credentials
          if (!email || !password) {
            return error('No password or email')
          } else {
            const user = await User.findOne({
              where: { email }
            })
            if (!user) {
              return error('User not found')
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
              return error('Wrong password')
            }
            const token = generateJwt(user.id, user.email, user.role)
            return { id: 4, name: 'john', jwt: token }
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = 'ADMIN'
      return session
    }
  }
})

export { handler as GET, handler as POST }
