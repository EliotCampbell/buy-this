import { NextResponse } from 'next/server'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'
import { generateJwt } from '@/utils'

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
    const token = await generateJwt(user.id, user.email, user.role)
    return NextResponse.json(
      {
        ok: true,
        message: 'Token updated successfully',
        dataObject: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      },
      {
        headers: {
          'Set-Cookie': `token=${token};Path=/;Max-Age=86400;HttpOnly`
        }
      }
    )
  } catch (e) {
    console.log('Internal error in login api ' + e.message)
  }
}
