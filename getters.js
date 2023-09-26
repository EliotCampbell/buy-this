import { Brand, Product, Specification } from '@/models/models'

export const getAllProducts = async ({
  orderKey = 'price',
  orderValue = 'ASC',
  offset = 0,
  page = 1,
  limit = 18,
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
