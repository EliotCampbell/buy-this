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

export const PUT = async (request, { params }) => {
  try {
    const id = params.id
    const name = await request.json
    const oldCategory = await Category.findByPk(id)
    console.log(oldCategory)
    if (oldCategory === null) {
      return NextResponse.json({
        ok: false,
        message: 'Category not found',
        dataObject: id,
        name
      })
    }
    const data = await Category.update(name, { where: { id: id } })
    const newCategory = await Category.findByPk(id)
    if (data[0] === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Category updated successfully',
        dataObject: {
          oldCategory: oldCategory,
          newCategory: newCategory
        }
      })
    } else {
      return NextResponse.json({
        ok: false,
        message: "Can't update category or category already updated",
        dataObject: { oldCategory }
      })
    }
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
