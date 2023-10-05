import { OrderProduct, Product } from '@/models/models'
import { NextResponse } from 'next/server'

export const GET = async (res, { params }) => {
  try {
    const { orderId } = params
    const orderProducts = await OrderProduct.findAll({
      where: { orderId },
      include: { model: Product, as: 'product' }
    })
    if (orderProducts) {
      return NextResponse.json({
        ok: true,
        message: 'Order found successfully',
        dataObject: { orderId, orderProducts }
      })
    } else
      return NextResponse.json({
        ok: false,
        message: 'Order not found',
        dataObject: { orderId }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
