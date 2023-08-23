import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const getCookies = () => {
  const cookieStore = cookies()
  return cookieStore.get('token')
}

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
