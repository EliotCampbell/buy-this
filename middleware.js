import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

export const middleware = async (request) => {
  if (request.nextUrl.pathname.startsWith('/api/brand')) {
    if (request.method !== 'OPTIONS') {
      try {
        const token = request.cookies.get('token').value
        if (!token) {
          return NextResponse.json({
            ok: false,
            message: 'Not auth or invalid token',
            dataObject: {}
          })
        }
        const decodedUser = await verify(token, process.env.SECRET_KEY)
        console.log('!!!!!!!' + decodedUser)
        if (decodedUser.role !== 'ADMIN') {
          return NextResponse.json({
            ok: false,
            message: 'You are not ADMIN',
            dataObject: {}
          })
        }
        return NextResponse.next()
      } catch (e) {
        console.log('!!!!!' + e)
        return NextResponse.json({
          ok: false,
          message: 'Check role middleware error',
          dataObject: { error: e }
        })
      }
    }
    return NextResponse.next()
  }
  return NextResponse.next()
}
