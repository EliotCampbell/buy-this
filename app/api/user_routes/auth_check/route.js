import { User } from '@/models/models'
import { generateJwt, verifyJwt } from '@/utils'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (request) => {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({
        ok: false,
        message: 'Not authorized',
        dataObject: { token }
      })
    }
    const payload = await verifyJwt(token)
    const user = await User.findOne({ where: { id: payload.id } })
    const newToken = await generateJwt(
      user.id,
      user.email,
      user.role,
      user.username
    )
    return NextResponse.json(
      {
        ok: true,
        message: 'Token updated successfully',
        dataObject: {
          id: user.dataValues.id,
          username: user.dataValues.username,
          email: user.dataValues.email,
          role: user.dataValues.role,
          address: user.dataValues.address,
          postalCode: user.dataValues.postalCode,
          city: user.dataValues.city,
          country: user.dataValues.country,
          phoneNumber: user.dataValues.phoneNumber
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
