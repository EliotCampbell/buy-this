'use client'

import React, { useEffect, useState } from 'react'
import classes from './Cart.module.css'
import CartProductRow from '@/components/Cart/CartProductRow/CartProductRow'
import Button from '@/components/UI/Button/Button'
import { fetchCart } from '@/http/cart'

const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetchCart()
      .then((data) => {
        setCart(data.dataObject.products)
      })
      .finally()
  }, [])

  return (
    <div className={classes.cartWrapper}>
      {cart.length > 0 ? (
        <>
          <h1>YOUR CART</h1>
          <div className={classes.rowTitles}>
            <p className={classes.rowTitleProduct}>PRODUCT</p>
            <p className={classes.rowTitleQuantity}>QUANTITY</p>
            <p className={classes.rowTitlePrice}>PRICE</p>
            <p className={classes.rowTitleSum}>SUM</p>
          </div>
          {cart.map((product) => {
            const formattedProduct = {
              quantity: product.quantity,
              ...product.product
            }
            return (
              <CartProductRow
                product={formattedProduct}
                key={product.productId}
              />
            )
          })}
          <Button>CHECKOUT</Button>
        </>
      ) : (
        <div className={classes.placeholder}>
          <h1>Your cart is empty</h1>
          <h5>For an order, please choose an item from our product catalog.</h5>
        </div>
      )}
    </div>
  )
}

export default Cart
