'use client'

import React from 'react'
import classes from './Cart.module.css'
import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'
import CartProductRow from '@/components/Cart/CartProductRow/CartProductRow'
import Button from '@/components/UI/Button/Button'

const Cart = () => {
  const { cart } = useShoppingCartStore((state) => ({
    cart: state.cart
  }))

  return (
    <div className={classes.cartWrapper}>
      <h1>YOUR CART</h1>
      <div className={classes.rowTitles}>
        <p className={classes.rowTitleProduct}>PRODUCT</p>
        <p className={classes.rowTitleQuantity}>QUANTITY</p>
        <p className={classes.rowTitlePrice}>PRICE</p>
        <p className={classes.rowTitleSum}>SUM</p>
      </div>
      {cart.map((product) => (
        <CartProductRow
          productId={product.productId}
          productCount={product.count}
          key={product.productId}
        />
      ))}
      <Button>CHECKOUT</Button>
    </div>
  )
}

export default Cart
