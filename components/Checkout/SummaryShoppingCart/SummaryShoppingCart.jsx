'use client'
import React from 'react'
import classes from './SummaryShoppingCart.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Cart = ({ cartProducts }) => {
  return (
    <div className={classes.cartWrapper}>
      <h1>YOUR CART</h1>
      <div className={classes.rowTitles}>
        <p className={classes.rowTitleProduct}>PRODUCT</p>
        <p className={classes.rowTitleQuantity}>QUANTITY</p>
        <p className={classes.rowTitlePrice}>PRICE</p>
        <p className={classes.rowTitleSum}>SUM</p>
      </div>

      {cartProducts.map((product) => {
        return (
          <div className={classes.row} key={product.id}>
            <div className={classes.productSection}>
              <div className={classes.imgWrapper}>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_REACT_APP_API_URL +
                    '/product/' +
                    product.id
                  }
                >
                  <Image
                    className={classes.img}
                    src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${product.img}`}
                    alt={'productImg'}
                    fill
                  />
                </Link>
              </div>
              <div className={classes.SpecificationsWrapper}>
                <Link
                  href={
                    process.env.NEXT_PUBLIC_REACT_APP_API_URL +
                    '/product/' +
                    product.id
                  }
                >
                  <p className={classes.name}>{product.name}</p>
                </Link>
              </div>
            </div>
            <div className={classes.quantitySection}>
              <p className={classes.name}>{product.quantity}</p>
            </div>
            <div className={classes.priceSection}>
              <div
                className={
                  product.discountPrice ? classes.salePrice : classes.price
                }
              >
                {`${Number.parseFloat(
                  product.discountPrice || product.price
                ).toFixed(2)} €`}
              </div>
            </div>
            <div className={classes.sumSection}>
              {`${Number.parseFloat(
                product.quantity *
                  (product.onSale ? product.discountPrice : product.price)
              ).toFixed(2)} €`}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cart
