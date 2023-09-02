import { create } from 'zustand'
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts
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
      set((state) => ({
        categoriesList: categoriesData.dataObject.categories.map((el) => ({
          value: el.id,
          label: el.name
        })),
        brandsList: brandsData.dataObject.brands.map((el) => ({
          value: el.id,
          label: el.name
        })),
        productsList: productsData.dataObject.products.rows.map((el) => ({
          value: el,
          label: el.name
        }))
      }))
    })
  },
  fetchCategoriesList: async () => {
    await fetchAllCategories().then((r) => {
      set((state) => ({
        categoriesList: r.dataObject.categories.map((el) => ({
          value: el.id,
          label: el.name
        }))
      }))
    })
  },
  fetchBrandsList: async () => {
    await fetchAllCategories().then((r) => {
      set((state) => ({
        brandsList: r.dataObject.brands.map((el) => ({
          value: el.id,
          label: el.name
        }))
      }))
    })
  },
  fetchProductsList: async () => {
    await fetchAllCategories().then((r) => {
      set((state) => ({
        productsList: r.dataObject.products.rows.map((el) => ({
          value: el,
          label: el.name
        }))
      }))
    })
  }
}))
