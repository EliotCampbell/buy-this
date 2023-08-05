import React from 'react'
import classes from './Select.module.css'

const Select = ({ children, label, ...props }) => {
  return (
    <div className={classes.div}>
      <label className={classes.label}>{label}</label>
      <select className={classes.input} {...props}>
        {children}
      </select>
    </div>
  )
}

export default Select
