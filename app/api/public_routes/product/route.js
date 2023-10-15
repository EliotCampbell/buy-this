import { NextResponse } from 'next/server'
import { Op } from 'sequelize'
import { getURLParams } from '@/utils'
const { Product, Specification, Brand } = require('@/models/models')
export const dynamic = 'force-dynamic'

export const GET = async (request) => {
  try {
    const searchParams = getURLParams(request)
    console.log(searchParams)

    const whereHandler = () => ({
      ...(searchParams.search && {
        name: { [Op.iLike]: `%${searchParams.search}%` }
      }),
      ...(searchParams.brandId && {
        brandId: searchParams.brandId
      }),
      ...(searchParams.categoryId && {
        categoryId: searchParams.categoryId
      }),
      ...(searchParams.onSale && {
        onSale: searchParams.onSale
      })
    })

    const products = await Product.findAll({
      where: whereHandler(),
      include: [
        { model: Specification, as: 'info' },
        { model: Brand, as: 'brand' }
      ],
      ...(searchParams.limit && { limit: searchParams.limit }),
      ...(searchParams.page && { page: searchParams.page }),
      ...(searchParams.limit &&
        searchParams.page && {
          offset: `${(searchParams.page - 1) * searchParams.limit}`
        }),
      ...(searchParams.orderKey &&
        searchParams.orderValue && {
          order: [
            [searchParams.orderKey || 'id', searchParams.orderValue || 'ASC']
          ]
        })
    })

    const count = await Product.count({
      where: whereHandler()
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
