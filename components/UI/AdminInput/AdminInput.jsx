import React from 'react'
import classes from './AdminInput.module.css'

const AdminInput = ({ children, ...props }) => {
  return (
    <div className={classes.inputDiv}>
      <input className={classes.input} {...props} />
      {children}
    </div>
  )
}

export default AdminInput
