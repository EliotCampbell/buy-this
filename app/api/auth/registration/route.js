import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'

const generateJwt = (id, email, role = 'USER') =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '12h' })

export const POST = async (request) => {
  try {
    const { email, password, role = 'USER' } = await request.json()
    if (!email || !password) {
      return NextResponse.json({
        ok: false,
        message: 'No email/password',
        dataObject: { email }
      })
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return NextResponse.json({
        ok: false,
        message: 'This email already exist',
        dataObject: { email }
      })
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    const token = generateJwt(user.id, user.email, user.role)
    return NextResponse.json({ token })
  } catch (e) {
    console.log('Internal error in registration api' + e.message)
  }
}
