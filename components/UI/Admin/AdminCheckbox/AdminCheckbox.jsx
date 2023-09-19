import React from 'react'
import classes from './AdminCheckbox.module.css'

const AdminCheckbox = ({ label, ...props }) => {
  return (
    <label
      className={classes.label}
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
