import React from 'react'
import classes from './BreadCrumbs.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProductStore, useQueryStore } from '@/store/store'

const BreadCrumbs = ({ product, productId }) => {
  const pathname = usePathname()
  const { query, setQuery } = useQueryStore((state) => ({
    setQuery: state.setQuery,
    query: state.query
  }))

  return (
    <div className={classes.breadCrumbs}>
      <Link href={'/'}>
        <p className={classes.breadCrumbsP}>MAIN</p>
      </Link>
      <p className={classes.arrow}>{' > '}</p>
      <Link href={'/store'}>
        <p className={classes.breadCrumbsP}>SHOP</p>
      </Link>
      {query?.categoryId && (
        <>
          <p className={classes.arrow}>{' > '}</p>
          <Link href={`/store`}>
            <p className={classes.breadCrumbsP}>
              {useProductStore.getState().categories.length !== 0 &&
                useProductStore
                  .getState()
                  .categories.find(
                    (el) => el.id.toString() === query.categoryId.toString()
                  )
                  .name.toUpperCase()}
            </p>
          </Link>
        </>
      )}
      {pathname !== '/store/product/' + productId && (
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
