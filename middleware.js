import { NextResponse } from 'next/server'
import { verifyJwt } from '@/utils'

export const middleware = async (request) => {
  const token = request.cookies.get('token')?.value
  const payload = token && (await verifyJwt(token))

  //ADMIN api routes
  if (request.nextUrl.pathname.startsWith('/api/admin_routes')) {
    try {
      if (!token) {
        return NextResponse.json({
          ok: false,
          message: 'Bad token/token is expired',
          dataObject: {}
        })
      }
      if (payload?.role === 'ADMIN') {
        return NextResponse.next()
      } else
        return NextResponse.json({
          ok: false,
          message: 'You are not ADMIN',
          dataObject: {}
        })
    } catch (error) {
      return NextResponse.json({
        ok: false,
        message: 'Check ADMIN role api middleware error',
        dataObject: { error: error }
      })
    }
  }
  // ADMIN routes
  else if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      if (payload?.role === 'ADMIN') NextResponse.next()
      else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      return NextResponse.json({
        ok: false,
        message: 'Check ADMIN role middleware error',
        dataObject: { error: error }
      })
    }
  }
  // USER API routes
  else if (request.nextUrl.pathname.startsWith('/api/user_routes')) {
    try {
      if (payload?.id) {
        //add userId to user API headers
        const headers = new Headers(request.headers)
        headers.set('userId', `${payload.id}`)
        return NextResponse.next({
          request: {
            headers
          }
        })
      } else
        return NextResponse.json({
          ok: false,
          message: 'Please login into your account',
          dataObject: {}
        })
    } catch (error) {
      return NextResponse.json({
        ok: false,
        message: 'Check user middleware error',
        dataObject: { error: error }
      })
    }
  }
  // USER routes
  else if (request.nextUrl.pathname.startsWith('/checkout')) {
    try {
      if (payload?.id) NextResponse.next()
      else {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  return NextResponse.next()
}
