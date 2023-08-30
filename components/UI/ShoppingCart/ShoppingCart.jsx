import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'
import React from 'react'
import classes from './ShoppingCart.module.css'
import ShoppingCartPreview from '@/components/UI/ShoppingCart/ShoppingCartPreview/ShoppingCartPreview'

const ShoppingCart = () => {
  const { cart } = useShoppingCartStore((state) => ({
    cart: state.cart
  }))
  return (
    <div>
      {cart.length === 0 ? (
        <h2>Your shopping cart is still empty.</h2>
      ) : (
        <>
          <p className={classes.cartTitle}>YOUR CART</p>
          {cart.map((el) => (
            <ShoppingCartPreview productId={el.productId} quantity={el.count} />
          ))}
        </>
      )}
      <div>
        <p className={classes.totalAmount}>Total amount:</p>
        {/*        <p>{cart.reduce((acc, el) => el.price + acc, 0)}</p>*/}
      </div>
    </div>
  )
}

export default ShoppingCart
