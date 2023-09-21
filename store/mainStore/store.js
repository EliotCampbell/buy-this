import { create } from 'zustand'

export const useProductStore = create((set) => ({
  categories: [],
  brands: [],
  products: [],
  productsCount: 0,
  setBrands: (brands) => set(() => ({ brands: brands })),
  setCategories: (categories) => set(() => ({ categories: categories })),
  setProducts: (products) => set(() => ({ products: products })),
  setProductsCount: (productsCount) =>
    set(() => ({ productsCount: productsCount }))
}))

export const useUserStore = create((set) => ({
  isAuth: false,
  user: {},
  message: null,
  topbarMessage: null,
  setUser: (user) => set(() => ({ user: user })),
  setMessage: (message) =>
    set(() => {
      return { message: message }
    }),
  setTopbarMessage: (message) => set(() => ({ topbarMessage: message })),
  setIsAuth: (bool) => set(() => ({ isAuth: bool }))
}))

export const useQueryStore = create((set) => ({
  query: { limit: 6, page: 1, order: '[["price", "ASC"]]' },
  setQuery: (query) => set(() => ({ query }))
}))
