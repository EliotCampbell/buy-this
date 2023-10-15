import React from 'react'
import classes from './AdminCheckbox.module.css'

const AdminCheckbox = ({ label, wide = false, ...props }) => {
  return (
    <label
      className={`${classes.label} ${wide && classes.labelWide}`}
      onDoubleClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
      }}
    >
      <div>
        <input className={classes.checkbox} type={'checkbox'} {...props} />
        {label}
      </div>
    </label>
  )
}

export default AdminCheckbox
