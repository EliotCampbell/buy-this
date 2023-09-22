'use client'

import React from 'react'
import classes from './Button.module.css'

const Button = ({ children, style, ...props }) => {
  if (style === 'light')
    return (
      <button {...props} className={classes.ButtonLight}>
        {children}
      </button>
    )
  else {
    return (
      <button {...props} className={classes.ButtonDark}>
        {children}
      </button>
    )
  }
}

export default Button
