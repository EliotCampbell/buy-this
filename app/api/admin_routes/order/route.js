import { Order, OrderProduct } from '@/models/models'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const orders = await Order.findAll({
      order: [['id', 'ASC']],
      include: [{ model: OrderProduct, as: 'order_products' }]
    })
    if (orders.length)
      return NextResponse.json({
        ok: true,
        message: 'Orders found successfully',
        dataObject: { orders }
      })
    else
      return NextResponse.json({
        ok: false,
        message: 'Users not found',
        dataObject: { orders }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
