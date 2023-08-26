import React from 'react'
import classes from './PaginationButton.module.css'

const PaginationButton = ({ children, ...props }) => {
  return (
    <>
      <button {...props} className={classes.Button}>
        {children}
      </button>
    </>
  )
}

export default PaginationButton
