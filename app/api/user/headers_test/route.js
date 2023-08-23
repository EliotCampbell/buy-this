import { NextResponse } from 'next/server'

export const GET = async (req) => {
  const request = await req.json()
  return NextResponse.json(request)
}
