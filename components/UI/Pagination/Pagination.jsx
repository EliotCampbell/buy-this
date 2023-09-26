'use client'

import React from 'react'
import classes from './Pagination.module.css'
import PaginationButton from '@/components/UI/PaginationButton/PaginationButton'
import { useSearchParams } from 'next/navigation'
import { useCustomRouter } from '@/components/Shop/useCustomRouter'

const Pagination = ({ products }) => {
  const { addSearchParam } = useCustomRouter()
  const searchParams = useSearchParams()
  const limit = searchParams.get('limit') || 18
  const page = searchParams.get('page') || 1

  const createPagesArr = (productsCount, limit) => {
    const pagesArr = []
    const pagesCount = Math.ceil(productsCount / limit)
    for (let i = 0; i < pagesCount; i += 1) {
      pagesArr.push(i + 1)
    }
    return pagesArr
  }

  const prevPageHandler = () => {
    page > 1 && addSearchParam('page', page - 1)
  }

  const nextPageHandler = (productsCount, limit) => {
    const lastPage = Math.ceil(productsCount / limit)
    lastPage > page && addSearchParam('page', page + 1)
  }

  return (
    <div className={classes.paginationWrapper}>
      <div className={classes.pagination}>
        <button className={classes.button} onClick={() => prevPageHandler()}>
          {'<'}
        </button>
        {createPagesArr(products.count, limit).map((el) => (
          <PaginationButton
            key={el}
            onClick={() => addSearchParam('page', el)}
            disabled={page === el}
          >
            {el}
          </PaginationButton>
        ))}
        <button
          className={classes.button}
          onClick={() => nextPageHandler(products.count, limit)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
