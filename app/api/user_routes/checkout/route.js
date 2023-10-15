import { headers } from 'next/headers'
import {
  CartProduct,
  Order,
  OrderProduct,
  Product,
  ShippingCost
} from '@/models/models'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const data = await request.json()
    const cart = await CartProduct.findAll({
      include: { model: Product, as: 'product' },
      where: { userId }
    }).then((data) =>
      data.map((cartProduct) => cartProduct.get({ plain: true }))
    )
    const shippingCost = await ShippingCost.findOne({
      where: { country: data.country }
    })
    const sum = Number.parseFloat(
      cart.reduce(
        (acc, el) =>
          el.product.onSale
            ? el.product.salePrice * el.quantity + acc
            : el.product.price * el.quantity + acc,
        shippingCost.dataValues.shippingCost
      )
    ).toFixed(2)

    const quantity = cart.reduce((acc, el) => el.quantity + acc, 0)
    const order = await Order.create({
      userId: userId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      amount: sum,
      productsQuantity: quantity,
      shippingCost: shippingCost.dataValues.shippingCost
    })
    const orderProduct = await OrderProduct.bulkCreate(
      cart.map((cartProduct) => ({
        quantity: cartProduct.quantity,
        price: cartProduct.product.salePrice || cartProduct.product.price,
        productId: cartProduct.productId,
        orderId: order.id
      }))
    )
    return NextResponse.json({
      ok: true,
      message: 'Order created successfully',
      dataObject: { order, orderProduct }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}
