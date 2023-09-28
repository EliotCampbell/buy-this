import React from 'react'
import classes from './Cart.module.css'
import CartProductRow from '@/components/Cart/CartProductRow/CartProductRow'
import Button from '@/components/UI/Button/Button'
import { getMyCart } from '@/getters'
import Link from 'next/link'

const Cart = async () => {
  const cartProducts = await getMyCart()
  return (
    <div className={classes.cartWrapper}>
      <h1>YOUR CART</h1>
      <div className={classes.rowTitles}>
        <p className={classes.rowTitleProduct}>PRODUCT</p>
        <p className={classes.rowTitleQuantity}>QUANTITY</p>
        <p className={classes.rowTitlePrice}>PRICE</p>
        <p className={classes.rowTitleSum}>SUM</p>
      </div>

      {cartProducts.map((product) => (
        <CartProductRow product={product} key={product.productId} />
      ))}
      <div className={classes.button}>
        <Link href={'/checkout/address'}>
          <Button>CHECKOUT</Button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
