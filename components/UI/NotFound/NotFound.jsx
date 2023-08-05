import React from 'react'
import classes from './NotFound.module.css'
import img404 from '../../../static/img404.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className={classes.main}>
      <h1>Whoops! ERROR 404 - PAGE NOT FOUND :_(</h1>
      <img src={img404} alt={img404} className={classes.img} />
      <Link to={'/'} className={classes.backLink}>
        <h1>{'<<<'} GO TO MAIN </h1>
      </Link>
    </div>
  )
}

export default NotFound
