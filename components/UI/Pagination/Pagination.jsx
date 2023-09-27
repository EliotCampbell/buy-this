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
  const lastPage = Math.ceil(products.count / limit)

  const createPagesArr = (productsCount, limit) => {
    const pagesArr = []
    const pagesCount = Math.ceil(productsCount / limit)
    for (let i = 0; i < pagesCount; i += 1) {
      pagesArr.push(i + 1)
    }
    return pagesArr
  }

  const prevPageHandler = (page) => {
    page > 1 && addSearchParam('page', parseInt(page) - 1)
  }

  const nextPageHandler = (page) => {
    lastPage > page && addSearchParam('page', parseInt(page) + 1)
  }

  return (
    <div className={classes.paginationWrapper}>
      <div className={classes.pagination}>
        <button
          className={classes.button}
          disabled={page <= 1}
          onClick={() => prevPageHandler(page)}
        >
          {'<'}
        </button>
        {createPagesArr(products.count, limit).map((el) => (
          <PaginationButton
            key={el}
            onClick={() => addSearchParam('page', el)}
            disabled={parseInt(page) === parseInt(el)}
          >
            {el}
          </PaginationButton>
        ))}
        <button
          className={classes.button}
          disabled={lastPage <= page}
          onClick={() => nextPageHandler(page)}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
