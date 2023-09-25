import { NextResponse } from 'next/server'

const { Brand } = require('@/models/models')

export const GET = async () => {
  try {
    const brands = await Brand.findAll({
      where: {},
      order: [['name', 'ASC']]
    })
    if (brands.length)
      return NextResponse.json({
        ok: true,
        message: 'Brands found successfully',
        dataObject: { brands }
      })
    else
      return NextResponse.json({
        ok: false,
        message: 'Brands not found',
        dataObject: { brands }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
