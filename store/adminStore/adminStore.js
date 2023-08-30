import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { values } from 'pg/lib/native/query'

const initialState = {
  productsList: [],
  categoriesList: [],
  brandsList: [],
  specificationsList: [],
  isValid: true,
  oldProductId: 1,
  newBrand: { name: '', brandId: '' },
  newCategory: { name: '', categoryId: '' },
  newSpecification: {
    title: '',
    description: '',
    productId: '',
    specificationId: ''
  },
  newProduct: {
    brand: { value: '' },
    category: { value: '' },
    name: '',
    price: '',
    description: '',
    file: 'noImg.jpg'
  },
  preview: process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'static/noImg.jpg'
}

export const useAdminStore = create(
  persist(
    (set) => ({
      ...initialState,
      reset: () => {
        set(initialState)
      },
      setIsValid: (bool) => set((state) => ({ isValid: bool })),
      setPreview: (img) =>
        set((state) => ({
          preview: img
        })),
      setProductsList: (list) =>
        set((state) => ({
          productsList: list.map((el) => ({ value: el, label: el.name }))
        })),
      setCategoriesList: (list) =>
        set((state) => ({
          categoriesList: list.map((el) => ({
            value: el.id,
            label: el.name
          }))
        })),
      setBrandsList: (list) =>
        set((state) => ({
          brandsList: list.map((el) => ({
            value: el.id,
            label: el.name
          }))
        })),
      setSpecificationsList: (list) =>
        set((state) => ({
          specificationsList: list.map((el) => ({
            value: el,
            label: el.title
          }))
        })),
      setNewSpecification: (specification) =>
        set((state) => ({ newSpecification: specification })),
      setNewCategory: (newCategory) =>
        set((state) => ({ newCategory: newCategory })),
      setNewBrand: (newBrand) => set((state) => ({ newBrand: newBrand })),
      setNewProduct: (newProduct) =>
        set((state) => ({ newProduct: newProduct }))
    }),
    { name: 'adminStore', version: 1 }
  )
)
