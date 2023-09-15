import { create } from 'zustand'
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchProductById
} from '@/http/fetchers/fetchers'

export const useAdminListsStore = create((set) => ({
  productsList: [],
  categoriesList: [],
  brandsList: [],
  specificationsList: [],
  fetchAll: async () => {
    await Promise.all([
      fetchAllCategories(),
      fetchAllBrands(),
      fetchAllProducts()
    ]).then(([categoriesData, brandsData, productsData]) => {
      set(() => ({
        categoriesList: categoriesData.dataObject.categories.map((el) => ({
          value: el.id,
          label: el.name
        })),
        brandsList: brandsData.dataObject.brands.map((el) => ({
          value: el.id,
          label: el.name
        })),
        productsList: productsData.dataObject.products.map((el) => ({
          value: el,
          label: el.name
        }))
      }))
    })
  },
  fetchCategoriesList: async () => {
    await fetchAllCategories().then((r) => {
      set(() => ({
        categoriesList: r.dataObject.categories.map((el) => ({
          value: el.id,
          label: el.name
        }))
      }))
    })
  },
  fetchBrandsList: async () => {
    await fetchAllBrands().then((r) => {
      set(() => ({
        brandsList: r.dataObject.brands.map((el) => ({
          value: el.id,
          label: el.name
        }))
      }))
    })
  },
  fetchProductsList: async () => {
    await fetchAllProducts().then((r) => {
      set(() => ({
        productsList: r.dataObject.products.map((el) => ({
          value: el,
          label: el.name
        }))
      }))
    })
  },
  fetchSpecificationsList: async (productId) => {
    await fetchProductById(productId).then((r) =>
      set(() => ({
        specificationsList: r.dataObject.product.info.map((el) => ({
          value: el,
          label: el.title
        }))
      }))
    )
  }
}))
