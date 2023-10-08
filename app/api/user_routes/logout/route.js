import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    return NextResponse.json(
      {
        ok: true,
        message: 'Logout successfully',
        dataObject: {}
      },
      {
        headers: {
          'Set-Cookie': `token=token;Path=/;Max-Age=0;HttpOnly`
        }
      }
    )
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Internal error in logout api',
      dataObject: { error: e }
    })
  }
}
