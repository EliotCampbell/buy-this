import React, { useRef } from 'react'
import classes from './AdminNewTextArea.module.css'

const AdminNewTextArea = ({ children, label, ...props }) => {
  const ref = useRef()
  return (
    <>
      {label && <label className={classes.label}>{label}</label>}
      <textarea className={classes.textarea} {...props} ref={ref} />
      {children}
    </>
  )
}
export default AdminNewTextArea
