/*export { default } from 'next-auth/middleware'

export const config = { matcher: ['/admin'] }*/

import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/auth/auth_check')) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-hello-from-middleware1', 'hello')

    // You can also set request headers in NextResponse.rewrite
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders
      }
    })

    // Set a new response header `x-hello-from-middleware2`
    response.headers.set('x-hello-from-middleware2', 'hello')
    return response
  }
}
