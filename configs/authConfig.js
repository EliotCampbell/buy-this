import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { error } from 'next/dist/build/output/log'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'
import SequelizeAdapter, { models } from '@auth/sequelize-adapter'
import { DataTypes } from 'sequelize'

const sequelize = require('../db')

export const authConfig = {
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
            return { name: 'john', email: 'email' }
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    })
  ],
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define('user', {
        ...models.User
      })
    }
  }),
  callbacks: {
    async session({ session, user }) {
      session.user.role = 'ADMIN'
      return session
    }
  }
}
