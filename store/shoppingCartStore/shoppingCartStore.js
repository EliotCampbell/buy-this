import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useShoppingCartStore = create(
  persist(
    (set) => ({
      cart: [
        { productId: 38, count: 4 },
        { productId: 39, count: 2 }
      ],
      addProduct: (productId, count) =>
        set((state) => ({ cart: [...state.cart, { productId, count }] })),
      removeProduct: (productId) =>
        set((state) => ({
          cart: state.cart.filter((el) => el.productId !== productId)
        }))
    }),
    { name: 'shoppingCart', version: 1 }
  )
)
