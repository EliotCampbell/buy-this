import { Category } from '@/models/models'
import { NextResponse } from 'next/server'

export const GET = async (request, { params }) => {
  try {
    const id = params.id
    const category = await Category.findByPk(id)
    if (category) {
      return NextResponse.json({
        ok: true,
        message: 'Category found successfully',
        dataObject: { category }
      })
    }
    return NextResponse.json({
      ok: false,
      message: 'Category not found',
      dataObject: { id }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
