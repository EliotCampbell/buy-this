import React from 'react'
import classes from '@/components/Cart/CartProductRow/CartProductRow.module.css'
import Image from 'next/image'
import Link from 'next/link'
import CartCounterBlock from '@/components/Cart/CartCounterBlock/CartCounterBlock'

const CartProductRow = ({ product }) => {
  return (
    product && (
      <div className={classes.row}>
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
            <p
              className={
                (product.inStock > 4 && classes.inStock) ||
                (product.inStock < 1 && classes.outOfStock) ||
                classes.runningOut
              }
            >{`Still ${product.inStock} in stock`}</p>
          </div>
        </div>
        <div className={classes.quantitySection}>
          <CartCounterBlock product={product} />
        </div>
        <div className={classes.priceSection}>
          <div className={product.onSale ? classes.brokenPrice : classes.price}>
            {`${Number.parseFloat(product.price).toFixed(2)} €`}
            {product.discountPrice && (
              <div className={classes.brokenPriceCross}></div>
            )}
          </div>
          {product.onSale && (
            <p className={classes.salePrice}>
              {`${Number.parseFloat(product.discountPrice).toFixed(2)} €`}
            </p>
          )}
        </div>
        <div className={classes.sumSection}>
          {`${Number.parseFloat(
            product.quantity *
              (product.onSale ? product.discountPrice : product.price)
          ).toFixed(2)} €`}
        </div>
      </div>
    )
  )
}

export default CartProductRow
