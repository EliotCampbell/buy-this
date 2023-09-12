import { NextResponse } from 'next/server'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'

export const POST = async (request) => {
  try {
    const role = 'USER'
    const formData = await request.formData()
    const email = formData.get('registration email')
    const username = formData.get('registration username')
    const password = formData.get('registration password')
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
    if (password.length < 8) {
      return NextResponse.json({
        ok: false,
        message: 'Password must be at least 8 characters long',
        dataObject: { username }
      })
    }
    const hashPassword = await bcrypt.hash(password, 5)
    await User.create({
      email,
      username,
      role,
      password: hashPassword
    })
    return NextResponse.json({
      ok: true,
      message: 'Registration completed successfully. Now you can login',
      dataObject: {}
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
