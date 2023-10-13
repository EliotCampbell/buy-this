import React from 'react'
import classes from './AdminInput.module.css'

const AdminInput = ({
  children,
  label,
  disabled,
  autoComplete = 'off',
  ariaAutocomplete = 'none',
  ...props
}) => {
  return (
    <div className={classes.inputDiv}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        autoComplete={autoComplete}
        aria-autocomplete={ariaAutocomplete}
        className={`${classes.input} ${disabled && classes.disabledInput}`}
        {...props}
        disabled={disabled}
      />
      {children}
    </div>
  )
}

export default AdminInput
