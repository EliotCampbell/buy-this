import React from 'react'
import classes from './CategorySideNav.module.css'
import { RxCross1 } from 'react-icons/rx'
import Link from 'next/link'
import { useProductStore } from '@/store/store'

const CategorySideNav = ({ switcher: setSwitcher }) => {
  return (
    <div className={classes.sideNavBack}>
      <div className={classes.exit} onClick={() => setSwitcher(false)}>
        <div
          className={classes.sideNav}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <div className={classes.top}>
            <div
              className={classes.topTextWrapper}
              onClick={() => setSwitcher(false)}
            >
              <RxCross1 />
              <p className={classes.topText}>Close side menu</p>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            <Link
              href={'/store'}
              className={classes.navEl}
              onClick={() => setSwitcher(false)}
            >
              <p className={classes.navP}>SHOW ALL PRODUCTS</p>
            </Link>
            {useProductStore.getState().categories.map((el) => (
              <Link
                href={`/store?categoryId=${el.id}`}
                className={classes.navEl}
                key={el.id}
                onClick={() => setSwitcher(false)}
              >
                <p className={classes.navP}>{el.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySideNav
