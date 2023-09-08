import React from 'react'
import classes from './AdminEditInput.module.css'

const AdminEditInput = ({ children, ...props }) => {
  return (
    <>
      <input className={classes.input} {...props} />
      {children}
    </>
  )
}

export default AdminEditInput
