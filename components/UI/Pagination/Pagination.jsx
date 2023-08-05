import React from 'react'
import classes from './Pagination.module.css'

const Pagination = () => {
  return (
    <div className={classes.paginationWrapper}>
      <div className={classes.pagination}>
        <button className={classes.button}>{'<'}</button>
        <p className={classes.page}>1</p>
        <p className={classes.page}>2</p>
        <p className={classes.page}>3</p>
        <p className={classes.page}>4</p>
        <p className={classes.page}>...</p>
        <p className={classes.page}>88</p>

        <button className={classes.button}>{'>'}</button>
      </div>
    </div>
  )
}

export default Pagination
