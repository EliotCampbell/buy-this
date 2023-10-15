import React from 'react'
import classes from './ProductDetails.module.css'
import ToCartBlock from '@/components/Shop/ProductDetails/ToCartBlock/ToCartBlock'
import BreadCrumbs from '../../UI/BreadCrumbs/BreadCrumbs'
import { Brand, Product, Specification } from '@/models/models'
import Description from '@/components/Shop/ProductDetails/Description/Description'
import Specifications from '@/components/Shop/ProductDetails/Specifications/Specifications'
import RatingsComments from '@/components/Shop/ProductDetails/RatingsComments/RatingsComments'
import HorizontalMenu from '@/components/UI/HorizontalMenu/HorizontalMenu'

const ProductDetails = async ({ productId }) => {
  const product = await Product.findOne({
    where: { id: productId },
    include: [
      { model: Specification, as: 'info' },
      { model: Brand, as: 'brand' }
    ]
  }).then((data) => {
    return data.toJSON()
  })
  const menu = [
    {
      title: 'DESCRIPTION',
      component: <Description description={product.description} />
    },
    {
      title: 'SPECIFICATIONS',
      component: <Specifications specifications={product.info} />
    },
    { title: 'COMMENTS & RATINGS', component: <RatingsComments /> }
  ]

  return (
    <>
      <div className={classes.product}>
        <BreadCrumbs
          product={product}
          productId={productId}
          breadCrumbType={product}
        />
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
                    product.salePrice
                  ).toFixed(2)} €`}</p>
                )}
              </div>
              <p
                className={
                  (product.inStock > 4 && classes.inStock) ||
                  (product.inStock < 1 && classes.outOfStock) ||
                  classes.runningOut
                }
              >
                Still {product.inStock} in stock
              </p>

              <ToCartBlock product={product} />
            </div>
          </div>
        </div>
        <HorizontalMenu menu={menu} />
      </div>
    </>
  )
}

export default ProductDetails
