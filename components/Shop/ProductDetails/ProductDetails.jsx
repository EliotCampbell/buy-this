'use client'
import React, { useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import Specifications from './Specifications/Specifications'
import Description from './Description/Description'
import RatingsComments from './RatingsComments/RatingsComments'
import ToCartCounter from '../../UI/ToCartCounter/ToCartCounter'
import BreadCrumbs from '../../UI/BreadCrumbs/BreadCrumbs'
import Button from '@/components/UI/Button/Button'

const ProductDetails = ({ productId }) => {
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_REACT_APP_API_URL + `api/product/${productId}`
        )
        const data = await res.json()
        setProducts(data.dataObject.products.rows)
        setProductsCount(data.dataObject.products.count)
      } catch (e) {
        console.log(e)
      }
    }
    fetchProducts().finally(setIsLoaded(true))
  }, [])
  const [product, setProduct] = useState([])
  const [selector, setSelector] = useState('description')

  return (
    <div className={classes.product}>
      <BreadCrumbs product={product} />
      <div className={classes.productMain}>
        <div className={classes.photoDiv}>
          {product.img && (
            <img
              className={classes.photo}
              src={process.env.REACT_APP_API_URL + product.img}
              alt="img"
            />
          )}
        </div>
        <div className={classes.mainInfo}>
          <div className={classes.mainInfoTop}>
            <p className={classes.productBrand}>
              {product.brandId &&
                products.brands.find(
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
              <ToCartCounter />
              <div className={classes.toCartSplitter}></div>
              <Button className={classes.cartButton}>ADD TO CART</Button>
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
        {selector === 'specifications' && <Specifications />}
        {selector === 'ratings & comments' && <RatingsComments />}
      </div>
    </div>
  )
}

export default ProductDetails
