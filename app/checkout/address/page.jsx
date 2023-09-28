import React from 'react'
import classes from './page.module.css'
import Checkout from "@/components/Checkout/Checkout";

const CartPage = () => {
  return (
    <div className={classes.page}>
      <Checkout />
    </div>
  )
}

export default CartPage
