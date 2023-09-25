import { NextResponse } from 'next/server'

const { Brand } = require('@/models/models')

export const POST = async (req) => {
  try {
    const { name } = await req.json()
    const foundBrand = await Brand.findOne({
      where: { name: name }
    })
    if (foundBrand !== null)
      return NextResponse.json({
        ok: false,
        message: 'Brand already exists',
        dataObject: { foundBrand: foundBrand }
      })
    const brand = await Brand.create({ name })
    return NextResponse.json({
      ok: true,
      message: 'Brand added successfully',
      dataObject: { brand }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
