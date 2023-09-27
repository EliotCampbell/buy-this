'use client'
import React, { useState } from 'react'
import classes from './CategorySideNav.module.css'
import { RxCross1 } from 'react-icons/rx'
import Link from 'next/link'
import { PiList } from 'react-icons/pi'

const CategorySideNav = ({ categories }) => {
  const [leftSwitcher, setLeftSwitcher] = useState(false)

  return (
    <>
      <div className={classes.categories} onClick={() => setLeftSwitcher(true)}>
        <PiList className={classes.ico} />
        <p className={classes.categoriesText}>ALL CATEGORIES</p>
      </div>

      {leftSwitcher && (
        <div className={classes.sideNavBack}>
          <div className={classes.exit} onClick={() => setLeftSwitcher(false)}>
            <div
              className={classes.sideNav}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              <div className={classes.top}>
                <div
                  className={classes.topTextWrapper}
                  onClick={() => setLeftSwitcher(false)}
                >
                  <RxCross1 />
                  <p className={classes.topText}>Close side menu</p>
                </div>
              </div>
              <div className={classes.contentWrapper}>
                <Link
                  href={'/store'}
                  className={classes.navEl}
                  onClick={() => {
                    setLeftSwitcher(false)
                  }}
                >
                  <p className={classes.navP}>SHOW ALL PRODUCTS</p>
                </Link>
                {categories.map((el) => (
                  <Link
                    href={`/store?categoryId=${el.id}`}
                    className={classes.navEl}
                    key={el.id}
                    onClick={() => {
                      setLeftSwitcher(false)
                    }}
                  >
                    <p className={classes.navP}>{el.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CategorySideNav
