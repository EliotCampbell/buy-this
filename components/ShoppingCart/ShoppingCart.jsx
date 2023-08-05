import React from 'react'
import classes from './ShoppingCart.module.css'

const ShoppingCart = () => {
  return (
    <div className={classes.shoppingCart}>
      <h1>BASKET</h1>
      <h2>Your shopping cart is still empty.</h2>
    </div>
  )
}

export default ShoppingCart
