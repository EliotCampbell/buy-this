import { NextResponse } from 'next/server'
import { verifyJwt } from '@/utils'

export const middleware = async (request) => {
  if (
    (request.method !== 'GET' &&
      request.nextUrl.pathname.startsWith('/api/brand')) ||
    (request.method !== 'GET' &&
      request.nextUrl.pathname.startsWith('/api/category')) ||
    (request.method !== 'GET' &&
      request.nextUrl.pathname.startsWith('/api/product')) ||
    (request.method !== 'GET' &&
      request.nextUrl.pathname.startsWith('/api/product_info'))
  ) {
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
      if (payload.role !== 'ADMIN') {
        return NextResponse.json({
          ok: false,
          message: 'You are not ADMIN',
          dataObject: {}
        })
      }
      return NextResponse.next()
    } catch (e) {
      return NextResponse.json({
        ok: false,
        message: 'Check role middleware error',
        dataObject: { error: e }
      })
    }
  }
  return NextResponse.next()
}
