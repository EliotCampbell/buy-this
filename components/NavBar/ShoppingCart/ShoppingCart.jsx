'use client'

import React, { useState } from 'react'
import classes from './ShoppingCart.module.css'
import Button from '@/components/UI/Button/Button'
import Link from 'next/link'
import ShoppingCartPreview from '@/components/NavBar/ShoppingCart/ShoppingCartPreview/ShoppingCartPreview'
import { FiShoppingCart } from 'react-icons/fi'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import SideMenu from '@/components/NavBar/SideMenu/SideMenu'

const ShoppingCart = ({ cartProducts }) => {
  const [cartSwitcher, setCartSwitcher] = useState(false)

  return (
    <>
      <IcoButton onClick={() => setCartSwitcher(true)}>
        <FiShoppingCart className={classes.ico} />
        <p className={classes.cartCounter}>
          {cartProducts.reduce((acc, el) => el.quantity + acc, 0)}
        </p>
      </IcoButton>{' '}
      {cartSwitcher && (
        <SideMenu setSwitcher={setCartSwitcher}>
          <div className={classes.shoppingCart}>
            <div className={classes.cartTitle}>
              <p className={classes.cartTitleName}>YOUR CART</p>
              <p className={classes.cartArticle}>
                {cartProducts.reduce((acc, el) => el.quantity + acc, 0) +
                  ' articles'}
              </p>
            </div>
            {cartProducts.length === 0 ? (
              <h3 className={classes.emptyMessage}>
                Your shopping cart is empty.
              </h3>
            ) : (
              <>
                {cartProducts.map((el) => (
                  <ShoppingCartPreview
                    key={el.cartProductId}
                    cartProduct={el}
                  />
                ))}
                <div className={classes.splitter}></div>
                <Link
                  className={classes.link}
                  href={'/cart'}
                  onClick={() => setCartSwitcher(false)}
                >
                  <Button>ORDER</Button>
                </Link>
              </>
            )}
            <div className={classes.amountDiv}>
              <p className={classes.totalAmount}>Total amount:</p>
              <p className={classes.totalAmount}>
                {`${Number.parseFloat(
                  cartProducts.reduce(
                    (acc, el) =>
                      el.onSale
                        ? el.salePrice * el.quantity + acc
                        : el.price * el.quantity + acc,
                    0
                  )
                ).toFixed(2)} €`}
              </p>
            </div>
          </div>
        </SideMenu>
      )}
    </>
  )
}

export default ShoppingCart
