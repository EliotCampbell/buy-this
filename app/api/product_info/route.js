import { NextResponse } from 'next/server'

const { ProductInfo, Product } = require('@/models/models')

export const POST = async (request) => {
  try {
    const formData = await request.formData()

    const title = formData.get('title')
    const description = formData.get('description')
    const productId = formData.get('productId')
    const foundProduct = await Product.findByPk(productId)
    if (foundProduct === null) {
      return NextResponse.json({
        ok: false,
        message: 'ProductDetails not found',
        dataObject: {
          newInfo: { title, description, productId }
        }
      })
    }
    const foundInfo = await ProductInfo.findOne({
      where: { title, productId }
    })
    if (foundInfo !== null) {
      return NextResponse.json({
        ok: false,
        message: `Info with title '${title}' already exists`,
        dataObject: {
          foundInfo,
          newInfo: { title, description, productId }
        }
      })
    }
    const newInfo = await ProductInfo.create({
      title,
      description,
      productId
    })
    return NextResponse.json({
      ok: true,
      message: 'Info added successfully',
      dataObject: { newInfo }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
