import React from 'react'
import classes from './BreadCrumbs.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/store/store'

const BreadCrumbs = ({
  searchQueryState,
  setSearchQueryState,
  product,
  initialState
}) => {
  const location = useRouter()

  if (location.pathname === '/store')
    return (
      <div className={classes.breadCrumbs}>
        <Link href={'/'}>
          <p className={classes.breadCrumbsP}>MAIN</p>
        </Link>
        <p className={classes.arrow}>{' > '}</p>
        <Link
          href={'/store'}
          onClick={(e) => {
            e.preventDefault()
            setSearchQueryState({ ...initialState, queryParams: {} })
          }}
        >
          <p className={classes.breadCrumbsP}>SHOP</p>
        </Link>
        {searchQueryState?.queryParams?.categoryId && (
          <>
            <p className={classes.arrow}>{' > '}</p>
            <Link
              href={`/store?categoryId=${searchQueryState.queryParams.categoryId}`}
            >
              <p className={classes.breadCrumbsP}>
                {useProductStore.getState().categories.length !== 0 &&
                  useProductStore
                    .getState()
                    .categories.find(
                      (el) =>
                        el.id.toString() ===
                        searchQueryState.queryParams.categoryId.toString()
                    )
                    .name.toUpperCase()}
              </p>
            </Link>
          </>
        )}
      </div>
    )
  return (
    <div className={classes.breadCrumbs}>
      <Link href={'/'}>
        <p className={classes.breadCrumbsP}>MAIN</p>
      </Link>
      <p className={classes.arrow}>{' > '}</p>
      <Link href={'/store'}>
        <p className={classes.breadCrumbsP}>SHOP</p>
      </Link>
      <p className={classes.arrow}>{' > '}</p>
      <Link href={`/store?categoryId=${product?.categoryId}`}>
        <p className={classes.breadCrumbsP}>
          {product?.categoryId &&
            useProductStore
              .getState()
              .categories.find(
                (el) => el.id.toString() === product.categoryId.toString()
              )
              .name.toUpperCase()}
        </p>
      </Link>
      <p className={classes.arrow}>{' > '}</p>
      <Link href={`/p/${product?.id}`}>
        <p className={classes.breadCrumbsP}>{product?.name?.toUpperCase()}</p>
      </Link>
    </div>
  )
}

export default BreadCrumbs
