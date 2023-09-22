import classes from './DBShoppingCartPreview.module.css'
import Image from 'next/image'
import { FiTrash } from 'react-icons/fi'
import React from 'react'
import Link from 'next/link'

const DBProductPreviewCard = ({
  productId,
  quantity,
  productName,
  productPrice,
  productImg,
  onSale,
  discountPrice
}) => {
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
          <p className={classes.removeIco}>
            <FiTrash />
          </p>
        </div>

        <div className={classes.countPriceDiv}>
          <p className={classes.productCount}>Quantity: {quantity}</p>
          <div className={classes.priceWrapper}>
            <div className={onSale ? classes.brokenPrice : classes.price}>
              {`${Number.parseFloat(productPrice).toFixed(2)} €`}
              {discountPrice && (
                <div className={classes.brokenPriceCross}></div>
              )}
            </div>
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

export default DBProductPreviewCard
