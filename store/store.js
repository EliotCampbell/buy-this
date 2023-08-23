import { create } from 'zustand'
import Cookies from 'js-cookie'
import { persist } from 'zustand/middleware'

export const useProductStore = create((set) => ({
  categories: [],
  brands: [],
  products: [],
  productsCount: 0,
  specifications: [],
  setCategories: (newCategories) =>
    set(() => ({
      categories: [
        ...newCategories.sort((a, b) => a.name.localeCompare(b.name))
      ]
    })),
  fetchCategories: async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/category'
      )
      const json = await res.json()
      set({ categories: [...json.dataObject.categories] })
    } catch (e) {
      console.log(e.message)
    }
  },
  fetchBrands: async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/brand'
      )
      const json = await res.json()
      set({ brands: [...json.dataObject.brands] })
    } catch (e) {
      console.log(e.message)
    }
  }
}))

export const useUserStore = create((set) => ({
  isLoading: true,
  isAuth: false,
  user: {},
  setIsLoading: (bool) => set((state) => ({ isLoading: bool })),
  setIsAuth: (bool) => set((state) => ({ isAuth: bool })),
  setUser: (user) => set((state) => ({ user: { ...user } }))
}))

/*
import { makeAutoObservable } from 'mobx'

class ProductsStore {
  constructor() {
    this._categories = []
    this._brands = []
    this._products = []
    this._productsCount = null
    this._specifications = []
    makeAutoObservable(this)
  }

  setCategories(categories) {
    this._categories = [
      ...categories.sort((a, b) => a.name.localeCompare(b.name))
    ]
  }

  setBrands(brands) {
    this._brands = [...brands.sort((a, b) => a.name.localeCompare(b.name))]
  }

  setProducts(products) {
    this._products = [...products]
  }

  setProductsCount(count) {
    this._productsCount = count
  }

  setSpecifications(specifications) {
    this._specifications = [...specifications]
  }

  get categories() {
    return this._categories
  }

  get brands() {
    return this._brands
  }

  get products() {
    return this._products
  }

  get productsCount() {
    return this._productsCount
  }

  get specifications() {
    return this._specifications
  }
}

export default new ProductsStore()*/
