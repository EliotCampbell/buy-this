import React from 'react'
import classes from './AdminFileInput.module.css'

const AdminFileInput = ({ label = '+ ADD FILE', disabled, ...props }) => {
  return (
    <label className={`${classes.label} ${disabled && classes.disabledLabel}`}>
      {label}
      <input
        type={'file'}
        className={`${classes.input} ${disabled && classes.disabledInput}`}
        {...props}
        disabled={disabled}
      />
    </label>
  )
}

export default AdminFileInput
