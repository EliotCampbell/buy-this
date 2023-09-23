'use client'

import React, { useState } from 'react'
import classes from './ToCartCounterAndButton.module.css'
import Button from '@/components/UI/Button/Button'
import { addProductToCart } from '@/http/cart'
import { useRouter } from 'next/navigation'

const ToCartCounterAndButton = ({ product }) => {
  const [counter, setCounter] = useState(1)
  const decrementor = () => {
    counter > 1 && setCounter(counter - 1)
  }
  const incrementor = () => {
    counter < 1000 && setCounter(counter + 1)
  }
  const regExp = /^(?:[0-9]|[1-9][0-9]{0,2}|)$/

  const router = useRouter()

  return (
    <div className={classes.toCart}>
      <div className={classes.counter}>
        <button className={classes.button} onClick={() => decrementor()}>
          <p className={classes.buttonText}>-</p>
        </button>
        <input
          className={classes.input}
          value={counter}
          onChange={(e) => {
            const candidate = Array.from(e.target.value)
            if (candidate[0] === '0') {
              candidate.shift()
              regExp.test(candidate) && setCounter(candidate)
            } else
              regExp.test(e.target.value) && setCounter(Number(e.target.value))
          }}
        ></input>
        <button className={classes.button} onClick={() => incrementor()}>
          <p className={classes.buttonText}>+</p>
        </button>
      </div>
      <div className={classes.toCartSplitter}></div>
      <Button
        className={classes.cartButton}
        onClick={() =>
          addProductToCart(
            product.id,
            counter,
            product.onSale ? product.discountPrice : product.price
          ).then(() => router.refresh())
        }
        disabled={counter <= 0}
      >
        ADD TO CART
      </Button>
    </div>
  )
}

export default ToCartCounterAndButton
