import { ShippingCost } from '@/models/models'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  try {
    const formData = await request.formData()
    const country = formData.get('country')
    const shippingCost = parseFloat(formData.get('shippingCost'))
    if (isNaN(shippingCost))
      return NextResponse.json({
        ok: false,
        message: `Shipping cost is not a number`,
        dataObject: { shippingCost }
      })
    const foundShippingCost = await ShippingCost.findOne({
      where: { country }
    })
    if (foundShippingCost)
      return NextResponse.json({
        ok: false,
        message: `Shipping costs for ${country} is already exists`,
        dataObject: { foundShippingCost }
      })
    const newShippingCost = ShippingCost.create({ country, shippingCost })
    return NextResponse.json({
      ok: true,
      message: 'New shipping cost successfully created',
      dataObject: { newShippingCost }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}
