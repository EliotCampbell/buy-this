import { NextResponse } from 'next/server'
import { generateJwt, verifyJwt } from '@/utils'
import { User } from '@/models/models'

export const POST = async (request) => {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({
        ok: false,
        message: 'Not authorized',
        dataObject: {}
      })
    }
    const payload = await verifyJwt(token)
    const user = await User.findOne({ where: { email: payload.email } })
    const newToken = await generateJwt(user.id, user.email, user.role)
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
          'Set-Cookie': `token=${newToken};Path=/;Max-Age=86400;HttpOnly`
        }
      }
    )
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        message: 'api/auth_check error',
        dataObject: { error: e.message }
      },
      {
        headers: {
          'Set-Cookie': `token=token;Path=/;Max-Age=0;HttpOnly`
        }
      }
    )
  }
}
