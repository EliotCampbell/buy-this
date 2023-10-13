'use client'
import React, { useState } from 'react'
import classes from './HorizontalMenu.module.css'

const HorizontalMenu = ({ menu = [] }) => {
  const [selector, setSelector] = useState(menu[0].title)
  return (
    <>
      <div className={classes.productContentChangers}>
        {menu.map((element) => (
          <div className={classes.contentHeaderWrapper} key={element.title}>
            <div
              className={
                selector === element.title
                  ? classes.selectedContentHeaderDiv
                  : classes.contentHeaderDiv
              }
            >
              <p
                className={classes.contentHeaderText}
                onClick={() => setSelector(element.title)}
              >
                {element.title}
              </p>
            </div>
            <div className={classes.splitter}></div>
          </div>
        ))}
        <div className={classes.filler}></div>
      </div>
      <div className={classes.content}>
        {menu.map(
          (element) =>
            selector === element.title && (
              <div key={element.title}>{element.component}</div>
            )
        )}
      </div>
    </>
  )
}

export default HorizontalMenu
