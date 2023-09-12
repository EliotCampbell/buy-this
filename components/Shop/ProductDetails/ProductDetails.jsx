'use client'
import React, { useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import Specifications from './Specifications/Specifications'
import Description from './Description/Description'
import RatingsComments from './RatingsComments/RatingsComments'
import ToCartCounter from '../../UI/ToCartCounter/ToCartCounter'
import BreadCrumbs from '../../UI/BreadCrumbs/BreadCrumbs'
import Button from '@/components/UI/Button/Button'
import { useProductStore } from '@/store/mainStore/store'
import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'
import { fetchProduct } from '@/http/fetchers/fetchers'
import NotFound from '@/components/UI/NotFound/NotFound'

const ProductDetails = ({ productId }) => {
  const { toCart } = useShoppingCartStore((state) => ({
    toCart: state.addProduct
  }))

  const { brands } = useProductStore((state) => ({ brands: state.brands }))

  const [product, setProduct] = useState(null)
  const [selector, setSelector] = useState('description')
  const [isLoaded, setIsLoaded] = useState(false)
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    fetchProduct(productId)
      .then((r) => setProduct(r.dataObject.product))
      .finally(setIsLoaded(true))
  }, [])

  return !product ? (
    <NotFound />
  ) : isLoaded ? (
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
              <p className={classes.productBrand}>
                {product.brandId &&
                  brands.find(
                    (el) => el.id.toString() === product.brandId.toString()
                  ).name}
              </p>
              <p className={classes.productName}>{product.name}</p>
              <p
                className={classes.productRating}
              >{`Rating ${product.rating}`}</p>
            </div>
            <div className={classes.mainInfoBottom}>
              <p className={classes.productPrice}>{`${product.price},00 $`}</p>
              <p className={classes.inStock}>Still 4 in stock</p>
              <div className={classes.toCart}>
                <ToCartCounter counter={counter} setCounter={setCounter} />
                <div className={classes.toCartSplitter}></div>
                <Button
                  className={classes.cartButton}
                  onClick={() =>
                    toCart(
                      product.id,
                      product.name,
                      counter,
                      product.price,
                      product.img
                    )
                  }
                  disabled={counter <= 0}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.productContentChangers}>
          <div
            className={
              selector === 'description'
                ? classes.selectedContentHeaderDiv
                : classes.contentHeaderDiv
            }
          >
            <p
              className={classes.contentHeaderText}
              onClick={() => setSelector('description')}
            >
              DESCRIPTION
            </p>
          </div>
          <div className={classes.splitter}></div>
          <div
            className={
              selector === 'specifications'
                ? classes.selectedContentHeaderDiv
                : classes.contentHeaderDiv
            }
          >
            <p
              className={classes.contentHeaderText}
              onClick={() => setSelector('specifications')}
            >
              SPECIFICATIONS
            </p>
          </div>
          <div className={classes.splitter}></div>
          <div
            className={
              selector === 'ratings & comments'
                ? classes.selectedContentHeaderDiv
                : classes.contentHeaderDiv
            }
          >
            <p
              className={classes.contentHeaderText}
              onClick={() => setSelector('ratings & comments')}
            >
              RATINGS & COMMENTS
            </p>
          </div>
          <div className={classes.filler}></div>
        </div>
        <div className={classes.content}>
          {selector === 'description' && (
            <Description description={product.description} />
          )}
          {selector === 'specifications' && (
            <Specifications specifications={product.info} />
          )}
          {selector === 'ratings & comments' && <RatingsComments />}
        </div>
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default ProductDetails
