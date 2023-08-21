import { NextResponse } from 'next/server'
import { Category } from '@/models/models'

export const GET = async () => {
  try {
    const categories = await Category.findAll()
    if (categories.length)
      return NextResponse.json({
        ok: true,
        message: 'Categories found successfully',
        dataObject: { categories }
      })
    else
      return NextResponse.json({
        ok: false,
        message: 'Categories not found',
        dataObject: { categories }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
