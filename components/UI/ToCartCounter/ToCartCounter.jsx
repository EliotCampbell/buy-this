import React from 'react'
import classes from './ToCartCounter.module.css'

const ToCartCounter = ({ counter, setCounter }) => {
  const decrementor = () => {
    counter > 1 && setCounter(counter - 1)
  }
  const incrementor = () => {
    counter < max && setCounter(counter + 1)
  }
  const regExp = /[0-9]/
  const max = 1000

  return (
    <div className={classes.counter}>
      <button className={classes.button} onClick={() => decrementor()}>
        <p className={classes.buttonText}>-</p>
      </button>
      <input
        className={classes.input}
        value={counter}
        onChange={(e) => {
          regExp.test(e.target.value) &&
            e.target.value < max &&
            setCounter(Number(e.target.value))
        }}
        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
      ></input>
      <button className={classes.button} onClick={() => incrementor()}>
        <p className={classes.buttonText}>+</p>
      </button>
    </div>
  )
}

export default ToCartCounter
