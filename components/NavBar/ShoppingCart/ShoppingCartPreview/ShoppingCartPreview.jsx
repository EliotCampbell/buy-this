'use client'
import classes from './ShoppingCartPreview.module.css'
import Image from 'next/image'
import { FiTrash } from 'react-icons/fi'
import React from 'react'
import Link from 'next/link'
import { removeProductFromCart } from '@/http/cart'
import { useRouter } from 'next/navigation'

const ProductPreviewCard = ({ cartProduct }) => {
  const router = useRouter()
  const removeProductHandler = (cartProductId) => {
    removeProductFromCart(cartProductId).then(() => router.refresh())
  }
  return (
    <div className={classes.cartPositionWrapper}>
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
          <p className={classes.removeIco}>
            <FiTrash
              onClick={() => removeProductHandler(cartProduct.cartProductId)}
            />
          </p>
        </div>

        <div className={classes.countPriceDiv}>
          <p className={classes.productCount}>
            Quantity: {cartProduct.quantity}
          </p>
          <div className={classes.priceWrapper}>
            <div
              className={
                cartProduct.onSale ? classes.brokenPrice : classes.price
              }
            >
              {`${Number.parseFloat(cartProduct.price).toFixed(2)} €`}
              {cartProduct.discountPrice && (
                <div className={classes.brokenPriceCross}></div>
              )}
            </div>
            {cartProduct.onSale && (
              <p className={classes.salePrice}>
                {`${Number.parseFloat(cartProduct.discountPrice).toFixed(2)} €`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPreviewCard
