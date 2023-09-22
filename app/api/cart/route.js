import { NextResponse } from 'next/server'
import { CartProduct } from '@/models/models'
import { headers } from 'next/headers'

export const GET = async (request) => {
  try {
    const userId = 1
    const data = await request.json()
    const product = await CartProduct.findOne({
      where: { userId: userId, productId: data.productId }
    })
    if (product) {
      return NextResponse.json({
        ok: true,
        message: 'Product found successfully',
        dataObject: { product }
      })
    } else
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: { productId }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}

export const POST = async (request) => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    console.log(userId)
    const data = await request.json()
    const product = await CartProduct.findOne({
      where: { userId: userId, productId: data.productId }
    })
    if (product === null) {
      const addedProduct = await CartProduct.create({
        productId: data.productId,
        userId,
        quantity: data.quantity,
        price: data.price
      })
      return NextResponse.json({
        ok: true,
        message: 'Product added successfully',
        dataObject: { addedProduct }
      })
    }
    if (product) {
      console.log('Product is already added')
    }
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}

/*
export const DELETE = async (request, { params }) => {
  try {
    const id = params.id
    const brand = await Brand.findByPk(id)
    const products = await Product.findAll({ where: { brandId: id } })
    if (brand === null) {
      return NextResponse.json({
        ok: false,
        message: 'Brand not found',
        dataObject: { id }
      })
    }
    if (products.length !== 0) {
      return NextResponse.json({
        ok: false,
        message: 'Brand is assigned to one or more products',
        dataObject: { id }
      })
    }
    const deletedBrand = await Brand.destroy({ where: { id: id } })
    if (deletedBrand === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Brand deleted successfully',
        dataObject: { id }
      })
    } else {
      return NextResponse.json({
        ok: false,
        message: "Can't delete brand",
        dataObject: { id }
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
*/
