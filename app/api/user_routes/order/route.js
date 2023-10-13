import { NextResponse } from 'next/server'
import { Order, OrderProduct } from '@/models/models'
import { headers } from 'next/headers'
export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const orders = await Order.findAll({
      where: { userId },
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
