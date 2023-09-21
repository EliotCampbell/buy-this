'use client'
import classes from './ShoppingCartPreview.module.css'
import Image from 'next/image'
import { FiTrash } from 'react-icons/fi'
import React from 'react'
import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'
import Link from 'next/link'

const ProductPreviewCard = ({
  productId,
  quantity,
  productName,
  productPrice,
  productImg,
  onSale,
  discountPrice
}) => {
  const { removeProduct } = useShoppingCartStore((state) => ({
    removeProduct: state.removeProduct
  }))

  return (
    <div className={classes.cartPositionWrapper}>
      <div className={classes.imgDiv}>
        <Image
          className={classes.img}
          src={productImg}
          alt={'productImg'}
          fill
        />
      </div>
      <div className={classes.cartPositionDescription}>
        <div className={classes.nameDiv}>
          <Link className={classes.productName} href={`/product/${productId}`}>
            {productName}
          </Link>
          <p
            className={classes.removeIco}
            onClick={() => removeProduct(productId)}
          >
            <FiTrash />
          </p>
        </div>

        <div className={classes.countPriceDiv}>
          <p className={classes.productCount}>Quantity: {quantity}</p>
          <div className={classes.priceWrapper}>
            <p className={onSale ? classes.brokenPrice : classes.price}>
              {`${Number.parseFloat(productPrice).toFixed(2)} €`}
              {discountPrice && (
                <div className={classes.brokenPriceCross}></div>
              )}
            </p>
            {onSale && (
              <p className={classes.salePrice}>
                {`${Number.parseFloat(discountPrice).toFixed(2)} €`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPreviewCard
