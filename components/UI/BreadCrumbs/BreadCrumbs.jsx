import React from 'react'
import classes from './BreadCrumbs.module.css'
import Link from 'next/link'

const BreadCrumbs = ({ product, searchParams, categories, breadCrumbType }) => {
  return (
    <div className={classes.breadCrumbs}>
      <Link href={'/'}>
        <p className={classes.breadCrumbsP}>MAIN</p>
      </Link>
      <p className={classes.arrow}>{' > '}</p>
      <Link href={'/store'}>
        <p className={classes.breadCrumbsP}>SHOP</p>
      </Link>
      {searchParams?.categoryId && (
        <>
          <p className={classes.arrow}>{' > '}</p>
          <Link href={`/store`}>
            <p className={classes.breadCrumbsP}>
              {categories
                .find(
                  (el) =>
                    el.id.toString() === searchParams.categoryId.toString()
                )
                .name.toUpperCase()}
            </p>
          </Link>
        </>
      )}
      {breadCrumbType === product && (
        <>
          <p className={classes.arrow}>{' > '}</p>
          <Link href={`/product/${product?.id}`}>
            <p className={classes.breadCrumbsP}>
              {product?.name?.toUpperCase()}
            </p>
          </Link>
        </>
      )}
    </div>
  )
}

export default BreadCrumbs
