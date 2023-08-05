import React from 'react'
import classes from './SearchInput.module.css'

const SearchInput = ({ children, ...props }) => {
  return (
    <>
      <input {...props} className={classes.input} id={classes.input}>
        {children}
      </input>
    </>
  )
}

export default SearchInput
