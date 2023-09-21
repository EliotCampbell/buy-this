import React from 'react'
import classes from './ProductDetails.module.css'
import ToCartCounterAndButton from '@/components/Shop/ProductDetails/ToCartCounterAndButton/ToCartCounterAndButton'
import BreadCrumbs from '../../UI/BreadCrumbs/BreadCrumbs'
import { Brand, Product, ProductInfo } from '@/models/models'
import ProductContent from '@/components/Shop/ProductDetails/ProductContent/ProductContent'

const ProductDetails = async ({ productId }) => {
  const product = await Product.findOne({
    where: { id: productId },
    include: [
      { model: ProductInfo, as: 'info' },
      { model: Brand, as: 'brand' }
    ]
  }).then((data) => {
    return data.toJSON()
  })

  return (
    <>
      <div className={classes.product}>
        <BreadCrumbs product={product} productId={productId} />
        <div className={classes.productMain}>
          <div className={classes.photoDiv}>
            <img
              className={classes.photo}
              src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${product.img}`}
              alt="img"
            />
          </div>
          <div className={classes.mainInfo}>
            <div className={classes.mainInfoTop}>
              <p className={classes.productBrand}>{product.brand.name}</p>
              <p className={classes.productName}>{product.name}</p>
              <p
                className={classes.productRating}
              >{`Rating ${product.rating}`}</p>
            </div>
            <div className={classes.mainInfoBottom}>
              <div className={classes.productPriceWrapper}>
                <p
                  className={
                    product.onSale ? classes.brokenPrice : classes.productPrice
                  }
                >{`${Number.parseFloat(product.price).toFixed(2)} €`}</p>
                {product.onSale && (
                  <p className={classes.productPrice}>{`${Number.parseFloat(
                    product.discountPrice
                  ).toFixed(2)} €`}</p>
                )}
              </div>
              <p
                className={
                  product.inStock > 5
                    ? classes.inStock
                    : product.inStock > 0
                    ? classes.runningOut
                    : classes.notInStock
                }
              >
                Still {product.inStock} in stock
              </p>

              <ToCartCounterAndButton product={product} />
            </div>
          </div>
        </div>
        <ProductContent product={product} />
      </div>
    </>
  )
}

export default ProductDetails
