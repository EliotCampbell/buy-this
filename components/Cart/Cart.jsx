'use client'

import React, { useEffect, useState } from 'react'
import classes from './Cart.module.css'
import CartProductRow from '@/components/Cart/CartProductRow/CartProductRow'
import Button from '@/components/UI/Button/Button'
import { fetchCart } from '@/http/cart'

const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const fetch = async () => {
      await fetchCart().then((data) => {
        setCart(data.dataObject.products)
      })
    }
    fetch().finally()
  }, [])

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
        <CartProductRow product={product} key={product.productId} />
      ))}

      <Button>CHECKOUT</Button>
    </div>
  )
}

export default Cart
