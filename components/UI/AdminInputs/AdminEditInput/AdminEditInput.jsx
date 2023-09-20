import React from 'react'
import classes from './AdminEditInput.module.css'

const AdminEditInput = ({ children, ...props }) => {
  return (
    <div className={classes.inputDiv}>
      <input className={classes.input} {...props} />
      {children}
    </div>
  )
}

export default AdminEditInput
