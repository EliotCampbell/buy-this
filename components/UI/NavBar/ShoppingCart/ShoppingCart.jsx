import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'
import React from 'react'
import classes from './ShoppingCart.module.css'
import ShoppingCartPreview from '@/components/UI/NavBar/ShoppingCart/ShoppingCartPreview/ShoppingCartPreview'
import Button from '@/components/UI/Button/Button'
import Link from 'next/link'

const ShoppingCart = () => {
  const { cart } = useShoppingCartStore((state) => ({
    cart: state.cart
  }))

  return (
    <div className={classes.shoppingCart}>
      <div className={classes.cartTitle}>
        <p className={classes.cartTitleName}>YOUR CART</p>
        <p className={classes.cartArticle}>
          {cart.reduce((acc, el) => el.count + acc, 0) + ' Articles'}
        </p>
      </div>
      {cart.length === 0 ? (
        <h3 className={classes.emptyMessage}>Your shopping cart is empty.</h3>
      ) : (
        <>
          {cart.map((el) => (
            <ShoppingCartPreview
              productId={el.productId}
              productName={el.name}
              productPrice={el.price}
              productImg={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.img}`}
              quantity={el.count}
              key={el.productId}
            />
          ))}
          <div className={classes.splitter}></div>
          <Link className={classes.link} href={'/checkout/cart'}>
            <Button onClick={() => {}}>ORDER</Button>
          </Link>
        </>
      )}
      <div className={classes.amountDiv}>
        <p className={classes.totalAmount}>Total amount:</p>
        <p className={classes.totalAmount}>
          {`${Number.parseFloat(
            cart.reduce((acc, el) => el.price * el.count + acc, 0)
          ).toFixed(2)} €`}
        </p>
      </div>
    </div>
  )
}

export default ShoppingCart
