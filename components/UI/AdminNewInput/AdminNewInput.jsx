import React from 'react'
import classes from './AdminNewInput.module.css'

const AdminNewInput = ({ children, ...props }) => {
  return (
    <div className={classes.inputDiv}>
      <input className={classes.input} {...props} />
      {children}
    </div>
  )
}

export default AdminNewInput
