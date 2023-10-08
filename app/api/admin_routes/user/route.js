import { NextResponse } from 'next/server'
import { Order, User } from '@/models/models'
export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const users = await User.findAll({
      order: [['id', 'ASC']],
      include: [
        { model: Order, as: 'orders' }
        /*        { model: OrderProduct, as: 'orderProduct' }*/
      ]
    })
    if (users.length)
      return NextResponse.json({
        ok: true,
        message: 'Users found successfully',
        dataObject: { users }
      })
    else
      return NextResponse.json({
        ok: false,
        message: 'Users not found',
        dataObject: { users }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
