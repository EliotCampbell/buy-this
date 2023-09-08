import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProductStore = create((set) => ({
  categories: [],
  brands: [],
  products: [],
  productsCount: 0,
  setBrands: (brands) => set((state) => ({ brands: brands })),
  setCategories: (categories) => set((state) => ({ categories: categories })),
  setProducts: (products) => set((state) => ({ products: products })),
  setProductsCount: (productsCount) =>
    set((state) => ({ productsCount: productsCount }))
}))

export const useSessionStore = create(
  persist(
    (set) => ({
      token: '',
      isAuth: false,
      setIsAuth: (bool) => set((state) => ({ isAuth: bool })),
      setToken: (token) => set((state) => ({ token: token }))
    }),
    { name: 'sessionStore', version: 1 }
  )
)

export const useUserStore = create((set) => ({
  isLoading: true,
  user: {},
  setIsLoading: (bool) => set((state) => ({ isLoading: bool })),
  setUser: (user) => set((state) => ({ user: user }))
}))

export const useQueryStore = create((set) => ({
  query: { limit: 6, page: 1 },
  setQuery: (query) => set((state) => ({ query }))
}))
