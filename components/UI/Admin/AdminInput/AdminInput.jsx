import React from 'react'
import classes from './AdminInput.module.css'

const AdminInput = ({ children, label, disabled, ...props }) => {
  return (
    <div
      className={`${classes.inputDiv} ${disabled && classes.disabledInputDiv}`}
    >
      {label && (
        <label
          className={`${classes.label} ${disabled && classes.disabledLabel}`}
        >
          {label}
        </label>
      )}
      <input
        className={`${classes.input} ${disabled && classes.disabledInput}`}
        {...props}
        disabled={disabled}
      />
      {children}
    </div>
  )
}

export default AdminInput
