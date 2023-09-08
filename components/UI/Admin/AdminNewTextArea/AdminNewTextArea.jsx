import React from 'react'
import classes from './AdminNewTextArea.module.css'

const AdminNewTextArea = ({ children, label, ...props }) => {
  return (
    <div className={classes.textareaDiv}>
      {label && <label className={classes.label}>{label}</label>}
      <textarea className={classes.textarea} {...props} />
      {children}
    </div>
  )
}

export default AdminNewTextArea
