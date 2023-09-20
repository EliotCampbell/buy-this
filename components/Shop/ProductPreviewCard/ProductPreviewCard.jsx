import React from 'react'
import classes from './ProductPreviewCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useProductStore } from '@/store/mainStore/store'

const ProductPreviewCard = ({
  productId,
  brandId,
  productName,
  productImg,
  productPrice,
  discountPrice,
  inStock
}) => {
  const brands = useProductStore((state) => state.brands)
  return (
    <div className={classes.productsCardWrapper}>
      <Link href={`/product/${productId}`} className={classes.productsCard}>
        <div>
          <p className={classes.brand}>
            {brandId
              ? brands.find((el) => el.id.toString() === brandId.toString())
                  ?.name
              : 'Brand'}
          </p>
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
            <p className={discountPrice ? classes.brokenPrice : classes.price}>
              {`${Number.parseFloat(productPrice).toFixed(2)} €`}
              {discountPrice && (
                <div className={classes.brokenPriceCross}></div>
              )}
            </p>
            {discountPrice && (
              <p className={classes.salePrice}>
                {`${Number.parseFloat(discountPrice).toFixed(2)} €`}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreviewCard
