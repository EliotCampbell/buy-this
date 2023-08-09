import { NextResponse } from 'next/server'

const { Brand } = require('../../../../models/models')

export const GET = async (res, { params }) => {
  try {
    console.log(params)
    const { id } = params
    const brand = await Brand.findByPk(id)
    if (brand) {
      return NextResponse.json({
        ok: true,
        message: 'Brand found successfully',
        dataObject: { brand }
      })
    } else
      return NextResponse.json({
        ok: false,
        message: 'Brand not found',
        dataObject: { id }
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
