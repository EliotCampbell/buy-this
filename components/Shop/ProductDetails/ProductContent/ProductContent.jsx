'use client'

import React, { useState } from 'react'
import classes from '@/components/Shop/ProductDetails/ProductDetails.module.css'
import Description from '@/components/Shop/ProductDetails/Description/Description'
import Specifications from '@/components/Shop/ProductDetails/Specifications/Specifications'
import RatingsComments from '@/components/Shop/ProductDetails/RatingsComments/RatingsComments'

const ProductContent = ({ product }) => {
  const [selector, setSelector] = useState('description')
  return (
    <>
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
    </>
  )
}

export default ProductContent
