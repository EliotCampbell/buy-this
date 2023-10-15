import React from 'react'
import classes from './CheckoutProductsSummary.module.css'
import Image from 'next/image'
import Link from 'next/link'

const CheckoutProductsSummary = ({ cartProducts }) => {
  return cartProducts.map((cartProduct) => (
    <div className={classes.cartPositionWrapper} key={cartProduct.id}>
      <div className={classes.cartProduct}>
        <div className={classes.imgDiv}>
          <Image
            className={classes.img}
            src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${cartProduct.img}`}
            alt={'productImg'}
            fill
          />
        </div>
        <div className={classes.cartPositionDescription}>
          <div className={classes.nameDiv}>
            <Link
              className={classes.productName}
              href={`/product/${cartProduct.id}`}
            >
              {cartProduct.name}
            </Link>
          </div>

          <div className={classes.countPriceDiv}>
            <p className={classes.productCount}>
              Quantity: {cartProduct.quantity}
            </p>
            <div className={classes.price}>
              {cartProduct.onSale
                ? `${Number.parseFloat(cartProduct.salePrice).toFixed(2)} €`
                : `${Number.parseFloat(cartProduct.price).toFixed(2)} €`}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default CheckoutProductsSummary
