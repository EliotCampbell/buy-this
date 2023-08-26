import React from 'react'
import classes from './Pagination.module.css'
import { useProductStore, useQueryStore } from '@/store/store'
import PaginationButton from '@/components/UI/PaginationButton/PaginationButton'

const Pagination = () => {
  const { productsCount } = useProductStore((state) => ({
    productsCount: state.productsCount
  }))

  const { setQuery, query } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  const createPagesArr = (productsCount, limit) => {
    const pagesArr = []
    const pagesCount = Math.ceil(productsCount / limit)
    for (let i = 0; i < pagesCount; i += 1) {
      pagesArr.push(i + 1)
    }
    return pagesArr
  }

  const prevPageHandler = () => {
    query.page > 1 && setQuery({ ...query, page: query.page - 1 })
  }

  const nextPageHandler = (productsCount, limit) => {
    const lastPage = Math.ceil(productsCount / limit)
    lastPage > query.page && setQuery({ ...query, page: query.page + 1 })
  }

  return (
    <div className={classes.paginationWrapper}>
      <div className={classes.pagination}>
        <button className={classes.button} onClick={() => prevPageHandler()}>
          {'<'}
        </button>
        {createPagesArr(productsCount, query.limit).map((el) => (
          <PaginationButton
            key={el}
            onClick={() => setQuery({ ...query, page: el })}
            disabled={query.page === el}
          >
            {el}
          </PaginationButton>
        ))}
        <button
          className={classes.button}
          onClick={() => nextPageHandler(productsCount, query.limit)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
