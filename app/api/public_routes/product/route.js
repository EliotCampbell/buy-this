import { NextResponse } from 'next/server'
import { Op } from 'sequelize'
const { Product, Specification, Brand } = require('@/models/models')
export const dynamic = 'force-dynamic'

export const GET = async (req) => {
  try {
    const nextSearchParams = new URLSearchParams(req.nextUrl.search)
    const brandId = nextSearchParams.get('brandId') || null
    const categoryId = nextSearchParams.get('categoryId') || null
    const limit = nextSearchParams.get('limit') || null
    const page = nextSearchParams.get('page') || 1
    const order = nextSearchParams.get('order') || null
    const search = nextSearchParams.get('search') || ''
    const offset = (page - 1) * (limit || 0)

    const whereHandler = () => {
      if (brandId && !categoryId) return { brandId }
      if (!brandId && categoryId) return { categoryId }
      if (brandId && categoryId) return { categoryId, brandId }
      else {
      }
    }

    let products = await Product.findAll({
      where: { ...whereHandler(), name: { [Op.iLike]: `%${search}%` } },
      include: [
        { model: Specification, as: 'info' },
        { model: Brand, as: 'brand' }
      ],
      limit,
      page,
      offset,
      order: JSON.parse(order)
    })

    const count = await Product.count({
      where: { ...whereHandler() }
    })

    if (count === 0) {
      return NextResponse.json({
        ok: true,
        message: 'Products not found',
        dataObject: { products }
      })
    }
    return NextResponse.json({
      ok: true,
      message: 'Products found successfully',
      dataObject: { count, products }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
