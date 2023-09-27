import { create } from 'zustand'
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts,
  fetchAllUsers,
  fetchProductById
} from '@/http/fetchers/fetchers'

export const useAdminListsStore = create((set) => ({
  productsList: [],
  categoriesList: [],
  brandsList: [],
  specificationsList: [],
  usersList: [],
  fetchAll: async () => {
    await Promise.all([
      fetchAllCategories(),
      fetchAllBrands(),
      fetchAllProducts({ order: '[["name", "ASC"]]' }),
      fetchAllUsers()
    ]).then(([categoriesData, brandsData, productsData, usersData]) => {
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
        })),
        usersList: usersData.dataObject.users.map((el) => ({
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
    await fetchAllProducts({ order: '[["name", "ASC"]]' }).then((r) => {
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
  },
  fetchUsersList: async () => {
    await fetchAllUsers().then((r) =>
      set(() => ({
        usersList: r.dataObject.users.map((el) => ({
          value: el,
          label: el.username
        }))
      }))
    )
  }
}))
