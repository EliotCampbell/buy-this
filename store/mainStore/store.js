import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useSessionStore = create(
  persist(
    (set) => ({
      token: '',
      isAuth: false,
      setIsAuth: (bool) => set(() => ({ isAuth: bool })),
      setToken: (token) => set(() => ({ token: token }))
    }),
    { name: 'sessionStore', version: 1 }
  )
)

export const useUserStore = create((set) => ({
  isLoading: true,
  user: {},
  message: null,
  setIsLoading: (bool) => set(() => ({ isLoading: bool })),
  setUser: (user) => set(() => ({ user: user })),
  setMessage: (message) => set(() => ({ message: message }))
}))

export const useQueryStore = create((set) => ({
  query: { limit: 6, page: 1 },
  setQuery: (query) => set(() => ({ query }))
}))
