'use client'

import React, { useState } from 'react'
import classes from './ToCartBlock.module.css'
import Counter from '@/components/Shop/ProductDetails/ToCartBlock/Counter/Counter'
import ToCartButton from '@/components/Shop/ProductDetails/ToCartBlock/ToCartButton/ToCartButton'

const ToCartBlock = ({ product }) => {
  const [counter, setCounter] = useState(1)

  return (
    <div className={classes.toCart}>
      <Counter
        counter={counter}
        setCounter={setCounter}
        inStock={product.inStock}
      />
      <div className={classes.toCartSplitter}></div>
      <ToCartButton product={product} counter={counter} />
    </div>
  )
}

export default ToCartBlock
