'use client'
import classes from './ShoppingCartPreview.module.css'
import Image from 'next/image'
import { fetchProductById } from '@/http/fetchers/fetchers'
import img from '@/public/img404.png'
import { FiTrash } from 'react-icons/fi'
import React, { useState } from 'react'
import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'

const ProductPreviewCard = ({ productId, quantity }) => {
  const { removeProduct } = useShoppingCartStore((state) => ({
    removeProduct: state.removeProduct
  }))

  const [product, setProduct] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  fetchProductById(productId).then((r) => {
    if (r.ok === true) {
      setProduct(r.dataObject.product)
    } else {
      return <h1>No product</h1>
    }
    setIsLoaded(true)
  })

  return isLoaded ? (
    <div className={classes.cartPositionWrapper}>
      <Image src={img} alt={'productImg'} height={80} width={80} />
      <div className={classes.cartPositionDescription}>
        <div className={classes.nameDiv}>
          <p className={classes.productName}>{product.name}</p>
          <p
            className={classes.removeIco}
            onClick={() => removeProduct(product.id)}
          >
            <FiTrash />
          </p>
        </div>

        <div className={classes.countPriceDiv}>
          <p className={classes.productCount}>Quantity: {quantity}</p>
          <p className={classes.price}>{product.price + ',00 $'}</p>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default ProductPreviewCard
