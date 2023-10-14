import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  selectedProduct: null,
  newBrand: { name: '', brandId: null },
  newCategory: { name: '', categoryId: null },
  newSpecification: {
    id: null,
    title: '',
    description: ''
  },
  newProduct: {
    brand: '',
    category: '',
    name: '',
    price: '',
    onSale: false,
    highlight: false,
    hotDeal: false,
    discountPrice: '',
    description: '',
    file: null,
    inStock: 0
  },
  preview: process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'static/noImg.jpg'
}

export const useAdminStore = create(
  persist(
    (set) => ({
      ...initialState,
      setSelectedProduct: (id) => set(() => ({ selectedProduct: id })),
      setNewBrand: (newBrand) => set(() => ({ newBrand: newBrand })),
      setNewCategory: (newCategory) =>
        set(() => ({ newCategory: newCategory })),
      setNewSpecification: (specification) =>
        set(() => ({ newSpecification: specification })),
      setNewProduct: (newProduct) => set(() => ({ newProduct: newProduct })),
      setPreview: (img) =>
        set(() => ({
          preview: img
        })),
      reset: () => {
        set(initialState)
      },
      resetExclude: (exclude) => {
        set(() => ({ ...initialState, ...exclude }))
      }
    }),
    { name: 'd', version: 1 }
  )
)
