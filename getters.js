import {
  Brand,
  CartProduct,
  Category,
  Product,
  Specification
} from '@/models/models'
import { cookies } from 'next/headers'
import { verifyJwt } from '@/utils'

export const getAllProducts = async ({
  orderKey = 'price',
  orderValue = 'ASC',
  page = 1,
  limit = 18,
  offset = (page - 1) * limit,
  brandId = null,
  categoryId = null
} = {}) => {
  const whereHandler = () => {
    if (brandId && !categoryId) return { brandId }
    if (!brandId && categoryId) return { categoryId }
    if (brandId && categoryId)
      return {
        categoryId,
        brandId
      }
    else {
    }
  }
  const count = await Product.count({
    where: { ...whereHandler() }
  })
  const products = await Product.findAll({
    where: { ...whereHandler() },
    include: [
      { model: Specification, as: 'info' },
      { model: Brand, as: 'brand' }
    ],
    limit,
    page,
    offset,
    order: [[orderKey, orderValue]]
  }).then((data) => data.map((product) => product.get({ plain: true })))
  return { count, rows: products }
}

export const getAllCategories = async () => {
  return await Category.findAll().then((data) =>
    data.map((category) => category.get({ plain: true }))
  )
}

export const getAllBrands = async () => {
  return await Brand.findAll().then((data) =>
    data.map((brand) => brand.get({ plain: true }))
  )
}

export const getMyCart = async () => {
  const nextCookies = cookies()
  const token = nextCookies.get('token')?.value
  const payload = await verifyJwt(token)
  if (payload?.id) {
    return await CartProduct.findAll({
      where: { userId: payload.id },
      include: [{ model: Product, as: 'product' }]
    }).then((data) =>
      data.map((el) => ({
        cartProductId: el.dataValues.id,
        quantity: el.dataValues.quantity,
        ...el.dataValues.product.dataValues
      }))
    )
  } else return []
}
