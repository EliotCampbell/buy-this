'use client'
import React from 'react'
import classes from './Counter.module.css'

const Counter = ({ counter, setCounter, inStock }) => {
  const decrementor = () => {
    counter > 1 && setCounter(counter - 1)
  }
  const incrementor = () => {
    counter < 1000 && counter < inStock && setCounter(counter + 1)
  }
  const regExp = /^(?:[0-9]|[1-9][0-9]{0,2}|)$/
  return (
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
            regExp.test(candidate) &&
              candidate <= inStock &&
              setCounter(candidate)
          } else
            regExp.test(e.target.value) &&
              e.target.value <= inStock &&
              setCounter(Number(e.target.value))
        }}
      ></input>
      <button className={classes.button} onClick={() => incrementor()}>
        <p className={classes.buttonText}>+</p>
      </button>
    </div>
  )
}

export default Counter
