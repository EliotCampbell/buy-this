import React from 'react'
import classes from './Description.module.css'

const Description = ({ description }) => {
  return <p className={classes.descriptionText}>{description}</p>
}

export default Description
