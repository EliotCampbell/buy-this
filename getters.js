import { Brand, Category, Product, Specification } from '@/models/models'

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
