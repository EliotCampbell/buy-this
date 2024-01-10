import React from 'react'
import classes from './ProductPreviewCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const ProductPreviewCard = ({
  productId,
  productName,
  productImg,
  productPrice,
  salePrice,
  inStock,
  onSale,
  brand
}) => {
  return (
    <div className={classes.productsCardWrapper}>
      <Link href={`/product/${productId}`} className={classes.productsCard}>
        <div>
          <p className={classes.brand}>{brand}</p>
          <p className={classes.name}>{productName}</p>
        </div>
        <div className={classes.imgDiv}>
          <Image
            className={classes.img}
            src={productImg}
            alt="img"
            fill={true}
            sizes="(max-width: 1920px) 294px"
          />
        </div>
        <div className={classes.priceAvailabilityDiv}>
          <p
            className={
              inStock > 5
                ? classes.inStock
                : inStock > 0
                  ? classes.runningOut
                  : classes.notInStock
            }
          >{`${inStock} in stock`}</p>
          <div className={classes.priceWrapper}>
            <div className={onSale ? classes.brokenPrice : classes.price}>
              {productPrice}
              {salePrice && <div className={classes.brokenPriceCross}></div>}
            </div>
            {onSale && (
              <p className={classes.salePrice}>
                {`${Number.parseFloat(salePrice).toFixed(2)} €`}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreviewCard
