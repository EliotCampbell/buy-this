import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useShoppingCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addProduct: (
        productId,
        name,
        count,
        price,
        onSale = false,
        discountPrice = null,
        img
      ) => {
        const candidate = {
          productId,
          name,
          count,
          price,
          img,
          discountPrice,
          onSale
        }
        set((state) => {
          const oldProduct = state.cart.find(
            (el) => el.productId === candidate.productId
          )
          if (oldProduct) {
            const filteredCart = state.cart.filter(
              (el) => el.productId !== productId
            )
            return {
              cart: [
                ...filteredCart,
                {
                  productId: candidate.productId,
                  name: candidate.name,
                  price: candidate.price,
                  img: candidate.img,
                  onSale: candidate.onSale,
                  discountPrice: candidate.discountPrice,
                  count: candidate.count + oldProduct.count
                }
              ]
            }
          } else {
            return {
              cart: [
                ...state.cart,
                { productId, name, count, price, img, discountPrice, onSale }
              ]
            }
          }
        })
      },
      removeProduct: (productId) =>
        set((state) => ({
          cart: state.cart.filter((el) => el.productId !== productId)
        }))
    }),
    { name: 'shoppingCart', version: 1 }
  )
)
