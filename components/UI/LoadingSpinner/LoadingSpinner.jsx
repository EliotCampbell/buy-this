import React from 'react'
import { FiRotateCw } from 'react-icons/fi'
import classes from './LoadingSpinner.module.css'

const LoadingSpinner = () => {
  return (
    <div>
      <FiRotateCw className={classes.spinner} />
    </div>
  )
}

export default LoadingSpinner
