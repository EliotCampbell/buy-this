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
  productPrice
}) => {
  const brands = useProductStore((state) => state.brands)
  return (
    <div className={classes.productsCardWrapper}>
      <Link href={`/product/${productId}`} className={classes.productsCard}>
        <div>
          <p className={classes.brand}>
            {brandId !== '' && brands !== []
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
