import React from 'react'
import classes from './AdminRadio.module.css'

const AdminRadio = ({ options = [], name, ...props }) => {
  return (
    <div className={classes.container}>
      {options.map((option) => (
        <label className={classes.label} key={option}>
          <input
            value={option}
            className={classes.input}
            type={'radio'}
            {...props}
            name={name}
          />
          {option}
        </label>
      ))}
    </div>
  )
}

export default AdminRadio
