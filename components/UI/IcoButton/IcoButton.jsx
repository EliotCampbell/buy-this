import React from 'react'
import classes from './IcoButton.module.css'

const IcoButton = ({ children, ...props }) => {
  return (
    <>
      <button {...props} className={classes.button}>
        {children}
      </button>
    </>
  )
}

export default IcoButton
