import { NextResponse } from 'next/server'
import { CartProduct, Product } from '@/models/models'
import { headers } from 'next/headers'

export const GET = async () => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const products = await CartProduct.findAll({
      where: { userId: userId },
      include: { model: Product, as: 'product' }
    })
    if (products) {
      const formattedProducts = products.map((product) => ({
        quantity: product.quantity,
        ...product.product.dataValues
      }))
      return NextResponse.json({
        ok: true,
        message: 'Product found successfully',
        dataObject: { products: formattedProducts }
      })
    } else
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: {}
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
    const candidate = await request.json()
    const product = await CartProduct.findOne({
      where: { userId: userId, productId: candidate.productId }
    })
    if (!product) {
      const addedProduct = await CartProduct.create({
        productId: candidate.productId,
        userId,
        quantity: candidate.quantity
      })
      return NextResponse.json({
        ok: true,
        message: 'Product added successfully',
        dataObject: { addedProduct }
      })
    }
    if (userId !== product?.userId.toString()) {
      return NextResponse.json({
        ok: false,
        message: "You can't add an item to cart of another user.",
        dataObject: {}
      })
    }
    if (product) {
      const updatedProduct = await CartProduct.update(
        {
          productId: candidate.productId,
          userId,
          quantity: candidate.quantity + product.quantity
        },
        { where: { id: product.id } }
      )
      return NextResponse.json({
        ok: true,
        message: 'Product added successfully',
        dataObject: { updatedProduct }
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

export const DELETE = async () => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    if (!userId) {
      return NextResponse.json({
        ok: false,
        message: "Can't get userId",
        dataObject: {}
      })
    }
    const deletedProduct = await CartProduct.destroy({
      where: { userId: userId }
    })
    if (deletedProduct === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Products in cart deleted successfully',
        dataObject: {}
      })
    } else {
      console.log(deletedProduct)
      return NextResponse.json({
        ok: false,
        message: "Can't delete products in cart",
        dataObject: {}
      })
    }
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}
