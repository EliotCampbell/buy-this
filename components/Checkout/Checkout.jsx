import React from 'react'
import { getMyCart } from '@/getters'
import classes from './Checkout.module.css'

const Checkout = async () => {
  const cartProducts = await getMyCart()
  return (
    <div className={classes.checkoutWrapper}>
      <h1>CHECKOUT</h1>
    </div>
  )
}

export default Checkout
