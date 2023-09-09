import { create } from 'zustand'

const initialState = {
  selectedProduct: null,
  newBrand: { name: '', brandId: '' },
  newCategory: { name: '', categoryId: '' },
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
    description: '',
    file: 'noImg.jpg'
  },
  preview: process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'static/noImg.jpg',
  message: null
}

export const useAdminStore = create((set) => ({
  ...initialState,
  setSelectedProduct: (id) => set(() => ({ selectedProduct: id })),
  setNewBrand: (newBrand) => set(() => ({ newBrand: newBrand })),
  setNewCategory: (newCategory) => set(() => ({ newCategory: newCategory })),
  setNewSpecification: (specification) =>
    set(() => ({ newSpecification: specification })),
  setNewProduct: (newProduct) => set(() => ({ newProduct: newProduct })),
  setPreview: (img) =>
    set(() => ({
      preview: img
    })),
  setMessage: (message) => set(() => ({ message: message })),
  reset: () => {
    set(initialState)
  },
  resetExclude: (exclude) => {
    set(() => ({ ...initialState, ...exclude }))
  }
}))
