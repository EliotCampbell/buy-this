import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'

const generateJwt = (id, email, role = 'USER') =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '12h' })

export const POST = async (request) => {
  try {
    const role = 'USER'
    const formData = await request.formData()
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')
    if (!email || !password || !username) {
      return NextResponse.json({
        ok: false,
        message: 'No email/password/username',
        dataObject: { email, username }
      })
    }
    const candidateEmail = await User.findOne({ where: { email } })
    if (candidateEmail) {
      return NextResponse.json({
        ok: false,
        message: 'This email already exist',
        dataObject: { email }
      })
    }
    const candidateUsername = await User.findOne({ where: { username } })
    if (candidateUsername) {
      return NextResponse.json({
        ok: false,
        message: 'This username already exist',
        dataObject: { username }
      })
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      email,
      username,
      role,
      password: hashPassword
    })
    const token = generateJwt(user.id, user.email, user.role)
    return NextResponse.json({
      ok: true,
      message: 'Registration completed successfully',
      dataObject: { token }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
