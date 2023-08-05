import React from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef(({ children, label, ...props }, ref) => {
  return (
    <div className={classes.div}>
      <label className={classes.label}>{label}</label>
      <input ref={ref} className={classes.input} {...props}>
        {children}
      </input>
    </div>
  )
})

export default Input
