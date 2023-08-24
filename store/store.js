import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProductStore = create((set) => ({
  categories: [],
  brands: [],
  products: [],
  productsCount: 0,
  specifications: [],
  fetchCategories: async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/category'
      )
      const data = await res.json()
      set({ categories: data.dataObject.categories })
    } catch (e) {
      console.log(e.message)
    }
  },
  fetchBrands: async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/brand'
      )
      const data = await res.json()
      set({ brands: data.dataObject.brands })
    } catch (e) {
      console.log(e.message)
    }
  }
}))

export const useSessionStore = create(
  persist(
    (set) => ({
      token: '',
      isAuth: false,
      setIsAuth: (bool) => set((state) => ({ IsAuth: bool })),
      setToken: (token) => set((state) => ({ token: token }))
    }),
    { name: 'token', version: 1 }
  )
)

export const useUserStore = create((set) => ({
  isLoading: true,
  user: {},
  setIsLoading: (bool) => set((state) => ({ isLoading: bool })),
  setUser: (user) => set((state) => ({ user: user }))
}))
