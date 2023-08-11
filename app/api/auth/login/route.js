import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'

const generateJwt = (id, email, role = 'USER') =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '12h' })

export const POST = async (request) => {
  try {
    const { email, password } = await request.json()
    const user = await User.findOne({ where: { email } })
    if (!user)
      return NextResponse.json({
        ok: false,
        message: 'User not found',
        dataObject: { email }
      })
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return NextResponse.json({
        ok: false,
        message: 'Wrong password',
        dataObject: { email }
      })
    }
    const token = generateJwt(user.id, user.email, user.role)
    return NextResponse.json({ token })
  } catch (e) {
    console.log('Error in login api' + e.message)
  }
}
