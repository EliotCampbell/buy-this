import { create } from 'zustand'

const initialState = {
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

export const useAdminStore = create((set) => ({
  ...initialState,
  reset: () => {
    set(initialState)
  },
  setIsValid: (bool) => set((state) => ({ isValid: bool })),
  setPreview: (img) =>
    set((state) => ({
      preview: img
    })),
  setNewSpecification: (specification) =>
    set((state) => ({ newSpecification: specification })),
  setNewCategory: (newCategory) =>
    set((state) => ({ newCategory: newCategory })),
  setNewBrand: (newBrand) => set((state) => ({ newBrand: newBrand })),
  setNewProduct: (newProduct) => set((state) => ({ newProduct: newProduct }))
}))
