'use client'

import React, { useState } from 'react'
import classes from './ToCartCounterAndButton.module.css'
import Button from '@/components/UI/Button/Button'
import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'

const ToCartCounterAndButton = ({ product }) => {
  const { toCart } = useShoppingCartStore((state) => ({
    toCart: state.addProduct
  }))

  const [counter, setCounter] = useState(1)
  const decrementor = () => {
    counter > 1 && setCounter(counter - 1)
  }
  const incrementor = () => {
    counter < 1000 && setCounter(counter + 1)
  }
  const regExp = /^(?:[0-9]|[1-9][0-9]{0,2}|)$/

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
          toCart(
            product.id,
            product.name,
            counter,
            product.price,
            product.onSale,
            product.discountPrice,
            product.img
          )
        }
        disabled={counter <= 0}
      >
        ADD TO CART
      </Button>
    </div>
  )
}

export default ToCartCounterAndButton
