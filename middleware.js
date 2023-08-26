import { NextResponse } from 'next/server'

export const middleware = async (request) => {
  /*if (request.nextUrl.pathname.startsWith('/api/user/auth_check')) {
    if (request.method !== 'OPTIONS') {
      const token = getCookies()
      console.log(token)
      return NextResponse.next()
    }
    NextResponse.next()
  }*/
  NextResponse.next()
}
