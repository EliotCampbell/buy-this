import { NextResponse } from 'next/server'

const { Specification } = require('@/models/models')

export const GET = async (request, { params }) => {
  try {
    const specificationId = params.id
    const foundSpecification = await Specification.findByPk(specificationId)
    if (foundSpecification === null) {
      return NextResponse.json({
        ok: false,
        message: 'Specification not found',
        dataObject: {
          specificationId
        }
      })
    }
    return NextResponse.json({
      ok: true,
      message: 'Success',
      dataObject: {
        foundSpecification
      }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
