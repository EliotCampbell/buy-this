import React from 'react'
import classes from './AdminNewInput.module.css'

const AdminNewInput = ({ children, label, ...props }) => {
  return (
    <div className={classes.inputDiv}>
      {label && <label className={classes.label}>{label}</label>}
      <input className={classes.input} {...props} />
      {children}
    </div>
  )
}

export default AdminNewInput
