import React, { useEffect, useState } from 'react'
import classes from '@/components/Cart/CartProductRow/CartProductRow.module.css'
import { fetchProductById } from '@/http/fetchers/fetchers'
import Image from 'next/image'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'

const CartProductRow = ({ productId, productCount }) => {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(productId)
        setProduct(data.dataObject.product)
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchProduct().then()
  }, [productId])

  return (
    product && (
      <div className={classes.row}>
        <div className={classes.productSection}>
          <div className={classes.imgWrapper}>
            <Image
              className={classes.img}
              src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${product.img}`}
              alt={'productImg'}
              fill
            />
          </div>
          <div className={classes.productInfoWrapper}>
            <p className={classes.name}>{product.name}</p>
            <p
              className={
                product.inStock > 5
                  ? classes.inStock
                  : product.inStock > 0
                  ? classes.runningOut
                  : classes.outOfStock
              }
            >{`Still ${product.inStock} in stock`}</p>
          </div>
        </div>
        <div className={classes.quantitySection}>
          <AdminInput value={productCount} />
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
            productCount *
              (product.onSale ? product.discountPrice : product.price)
          ).toFixed(2)} €`}
        </div>
      </div>
    )
  )
}

export default CartProductRow