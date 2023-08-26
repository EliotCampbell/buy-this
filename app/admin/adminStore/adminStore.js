import { create } from 'zustand'
import { useProductStore } from '@/store/store'
import { persist } from 'zustand/middleware'

const initialState = {
  productsList: useProductStore.getState().products.map((el) => ({
    value: el,
    label: el.name
  })),
  categoriesList: useProductStore.getState().categories.map((el) => ({
    value: el.id,
    label: el.name
  })),
  brandsList: useProductStore.getState().brands.map((el) => ({
    value: el.id,
    label: el.name
  })),
  specificationsList: useProductStore.getState().specifications.map((el) => ({
    value: el.id,
    label: el.title
  })),
  isValid: true,
  oldProductId: '',
  newBrand: { name: '', brandId: '' },
  newCategory: { name: '', categoryId: '' },
  newSpecification: {
    title: '',
    description: '',
    productId: '',
    specificationId: ''
  },
  newProduct: {
    brandId: '',
    categoryId: '',
    name: '',
    price: '',
    description: '',
    file: ''
  },
  preview: process.env.REACT_APP_API_URL + 'noImg.jpg',
  message: null
}

export const useAdminStore = create((set) => ({
  ...initialState,
  reset: () => {
    set(initialState)
  },
  setIsValid: (bool) => set((state) => ({ isValid: bool })),
  setPreview: (preview) => set((state) => ({ preview: preview })),
  setProductsList: (list) => set((state) => ({ productsList: list })),
  setCategoriesList: (list) => set((state) => ({ categoriesList: list })),
  setSpecificationsList: (list) =>
    set((state) => ({ specificationsList: list })),
  setBrandsList: (list) => set((state) => ({ brandsList: list })),
  setMessage: (message) => set((state) => ({ message: message })),
  setNewCategory: (newCategory) =>
    set((state) => ({ newCategory: newCategory }))
}))

export const useAdminProductsStore = create((set) => ({
  adminCategories: [],
  adminBrands: [],
  adminProducts: [],
  adminProductsCount: 0,
  adminSpecifications: [],
  setAdminBrands: (brands) => set((state) => ({ brands: brands })),
  setAdminCategories: (categories) =>
    set((state) => ({ categories: categories })),
  setAdminProducts: (products) => set((state) => ({ products: products })),
  setAdminProductsCount: (productsCount) =>
    set((state) => ({ productsCount: productsCount })),
  setAdminSpecifications: (specifications) =>
    set((state) => ({ specifications: specifications }))
}))
