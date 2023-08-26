import { NextResponse } from 'next/server'

const { ProductInfo, Product } = require('@/models/models')

export const GET = async (request, { params }) => {
  try {
    const specificationId = params.id
    const foundSpecification = await ProductInfo.findByPk(specificationId)
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

export const PUT = async (request, { params }) => {
  try {
    const id = params.id
    const formData = await request.formData()

    const title = formData.get('title')
    const description = formData.get('description')
    const oldInfo = await ProductInfo.findByPk(id)
    if (oldInfo === null) {
      return NextResponse.json({
        ok: false,
        message: 'Info not found',
        dataObject: {
          id,
          newInfo: { title, description }
        }
      })
    }
    const newInfoStatus = await ProductInfo.update(
      { title, description },
      { where: { id: id } }
    )
    const newInfo = await ProductInfo.findByPk(id)
    if (newInfoStatus[0] === 1)
      return NextResponse.json({
        ok: true,
        message: 'Info successfully updated',
        dataObject: {
          oldInfo,
          newInfo
        }
      })
    if (newInfoStatus[0] === 0)
      return NextResponse.json({
        ok: false,
        message: "Can't update or already updated",
        dataObject: {
          oldInfo,
          newInfo
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

export const DELETE = async (request, { params }) => {
  try {
    const id = params.id
    const specification = await ProductInfo.findByPk(id)
    if (specification === null) {
      NextResponse.json({
        ok: false,
        message: 'Specification not found',
        dataObject: { id }
      })
    }
    const deletedSpecification = await ProductInfo.destroy({
      where: { id: id }
    })
    if (deletedSpecification === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Specification deleted successfully',
        dataObject: { id }
      })
    } else {
      return NextResponse.json({
        ok: false,
        message: "Can't delete specification",
        dataObject: { id }
      })
    }
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
