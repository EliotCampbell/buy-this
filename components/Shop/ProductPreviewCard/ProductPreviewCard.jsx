import React from 'react'
import classes from './ProductPreviewCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
const ProductsStore = ''
const ProductPreviewCard = ({
  productId,
  brandId,
  productName,
  productImg,
  productPrice
}) => {
  return (
    <div className={classes.productsCardWrapper}>
      <Link href={`/p/${productId}`} className={classes.productsCard}>
        <div>
          <p className={classes.brand}>
            {brandId === ''
              ? 'Brand'
              : ProductsStore?.brands?.find(
                  (el) => el.id.toString() === brandId.toString()
                ).name}
          </p>
          <p className={classes.name}>{productName}</p>
        </div>
        <div className={classes.imgDiv}>
          <Image
            className={classes.img}
            src={productImg}
            alt="img"
            width={294}
            height={294}
            layout="responsive"
          />
        </div>
        <div className={classes.priceAvailabilityDiv}>
          <p className={classes.inStock}>In stock</p>
          <p className={classes.price}>{`${productPrice},00 €`}</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductPreviewCard
