import { NextRequest, NextResponse } from 'next/server'
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

export const GET = async (req) => {
  try {
    const nextSearchParams = new URLSearchParams(req.nextUrl.search)
    const brandId = nextSearchParams.get('brandId') || null
    const categoryId = nextSearchParams.get('categoryId') || null
    const limit = nextSearchParams.get('limit') || null
    const page = nextSearchParams.get('page') || 1
    const order = nextSearchParams.get('order') || null
    const offset = (page - 1) * (limit || 0)

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
