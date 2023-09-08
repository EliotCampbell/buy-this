'use client'

import React from 'react'
import classes from './Color.module.css'

const Color = ({ children, color }) => {
  return (
    <div style={{ backgroundColor: color || 'red' }} className={classes.color}>
      <p
        className={classes.text}
        onClick={() => {
          navigator.clipboard.writeText(color)
        }}
      >
        {children}
      </p>
    </div>
  )
}

export default Color
