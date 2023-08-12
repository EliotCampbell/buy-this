import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { headers } from 'next/headers'

const generateJwt = (id, email, role = 'USER') =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '12h' })

export const GET = async () => {
  try {
    const headersList = headers() || undefined
    if (!headersList || !headersList.has('authorization')) {
      return NextResponse.json({ message: 'Not auth' }, { status: 401 })
    }
    const oldToken = headersList.get('authorization').split(' ')[1]
    if (!oldToken) {
      return NextResponse.json({ message: 'Not auth' }, { status: 401 })
    }
    const decodedUser = jwt.verify(oldToken, process.env.SECRET_KEY)
    const newToken = generateJwt(
      decodedUser.id,
      decodedUser.email,
      decodedUser.role
    )
    return NextResponse.json(
      {
        ok: false,
        message: 'Token updated successfully',
        dataObject: { newToken, decodedUser }
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': [
            `userId=${
              decodedUser.id
            };Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `userEmail=${
              decodedUser.email
            };Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `userRole=${
              decodedUser.role
            };Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `tokenIat=${
              decodedUser.iat
            };Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `tokenExp=${
              decodedUser.exp
            };Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `token=${newToken};Path=/;Max-Age=${'86400'};HttpOnly;Secure`
          ]
        }
      }
    )
  } catch (e) {
    console.error(e)
    NextResponse.json(
      { ok: false, message: 'auth_check error', dataObject: {} },
      { status: 401 }
    )
  }
}
