import { NextResponse } from 'next/server'

const { Product, ProductInfo } = require('@/models/models')

export const GET = async (request, { params }) => {
  try {
    const id = params.id
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }]
    })
    if (product === null) {
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: { id }
      })
    }
    return NextResponse.json({
      ok: true,
      message: 'Product found successfully',
      dataObject: { product }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
