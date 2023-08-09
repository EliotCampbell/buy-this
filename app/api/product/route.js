import { NextResponse } from 'next/server'
const {
  Product,
  ProductsInfo,
  Category,
  ProductInfo,
  Brand
} = require('@/models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

export const GET = async (req, params) => {
  try {
    let {
      brandId = null,
      categoryId = null,
      limit = null,
      page = 1,
      order = null,
      offset = page * limit - limit
    } = params

    const whereHandler = () => {
      if (brandId && !categoryId) return { brandId }
      if (!brandId && categoryId) return { categoryId }
      if (brandId && categoryId) return { categoryId, brandId }
      else {
      }
    }

    let products = await Product.findAndCountAll({
      where: { ...whereHandler() },
      limit,
      page,
      offset,
      order: JSON.parse(order)
    })

    if (products.rows.length === 0) {
      return NextResponse.json({
        ok: true,
        message: 'Products not found',
        dataObject: { products }
      })
    }
    return NextResponse.json({
      ok: true,
      message: 'Products found successfully',
      dataObject: { products }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
