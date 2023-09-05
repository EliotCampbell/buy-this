import { NextResponse } from 'next/server'
import { Product } from '@/models/models'

const { Brand } = require('../../../../models/models')

export const GET = async (res, { params }) => {
  try {
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

export const PUT = async (request, { params }) => {
  try {
    const id = params.id
    const name = await request.json()
    const oldBrand = await Brand.findByPk(id)
    if (oldBrand === null) {
      return NextResponse.json({
        ok: false,
        message: 'Brand not found',
        dataObject: id,
        name
      })
    }
    const data = await Brand.update(name, { where: { id: id } })
    const newBrand = await Brand.findByPk(id)
    if (data[0] === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Brand updated successfully',
        dataObject: {
          oldBrand: oldBrand,
          newBrand: newBrand
        }
      })
    } else {
      return NextResponse.json({
        ok: false,
        message: "Can't update brand or brand already updated",
        dataObject: { oldBrand: oldBrand }
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

export const DELETE = async (request, { params }) => {
  try {
    const id = params.id
    const brand = await Brand.findByPk(id)
    const products = await Product.findAll({ where: { brandId: id } })
    if (brand === null) {
      return NextResponse.json({
        ok: false,
        message: 'Brand not found',
        dataObject: { id }
      })
    }
    if (products.length !== 0) {
      return NextResponse.json({
        ok: false,
        message: 'Brand is assigned to one or more products',
        dataObject: { id }
      })
    }
    const deletedBrand = await Brand.destroy({ where: { id: id } })
    if (deletedBrand === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Brand deleted successfully',
        dataObject: { id }
      })
    } else {
      return NextResponse.json({
        ok: false,
        message: "Can't delete brand",
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
