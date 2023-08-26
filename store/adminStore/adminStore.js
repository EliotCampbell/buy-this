import { create } from 'zustand'
import { useProductStore } from '@/store/mainStore/store'
import { persist } from 'zustand/middleware'

const initialState = {
  productsList: [],
  categoriesList: [],
  brandsList: [],
  specificationsList: [],
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
  preview: process.env.REACT_APP_API_URL + 'noImg.jpg'
}

export const useAdminStore = create(
  persist(
    (set) => ({
      ...initialState,
      reset: () => {
        set(initialState)
      },
      setIsValid: (bool) => set((state) => ({ isValid: bool })),
      setPreview: (preview) => set((state) => ({ preview: preview })),
      setProductsList: (list) => set((state) => ({ productsList: list })),
      setCategoriesList: (list) =>
        set((state) => ({
          categoriesList: list.map((el) => ({
            value: el.id,
            label: el.name
          }))
        })),
      setSpecificationsList: (list) =>
        set((state) => ({ specificationsList: list })),
      setBrandsList: (list) => set((state) => ({ brandsList: list })),
      setNewCategory: (newCategory) =>
        set((state) => ({ newCategory: newCategory }))
    }),
    { name: 'adminStore', version: 1 }
  )
)
