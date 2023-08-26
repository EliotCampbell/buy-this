'use client'

import React, { useState } from 'react'
import classes from './ShopSidebar.module.css'
import ReactSelect from '../../UI/ReactSelect/ReactSelect'
import { useProductStore, useQueryStore } from '@/store/mainStore/store'

const ShopSidebar = () => {
  const { categories, brands } = useProductStore((state) => ({
    categories: state.categories,
    brands: state.brands
  }))

  const { query, setQuery } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  const [selectedBrand, setSelectedBrand] = useState(null)

  return (
    <div className={classes.shopNav}>
      {
        <>
          <p
            className={classes.categories}
            onClick={() => {
              setQuery({
                ...query,
                categoryId: ''
              })
            }}
          >
            CATEGORIES
          </p>
          {categories.map((el) => (
            <div
              className={classes.shopNavLink}
              key={el.id}
              onClick={() => {
                setQuery({
                  ...query,
                  categoryId: el.id
                })
              }}
            >
              {el.name}
            </div>
          ))}
        </>
      }
      {
        <>
          <p className={classes.categories}>FILTER</p>
          <ReactSelect
            label={'Select brand'}
            options={brands.map((el) => ({
              value: el.id,
              label: el.name
            }))}
            value={selectedBrand}
            onChange={(option) => {
              setQuery({
                ...query,
                brandId: option.value
              })
              setSelectedBrand(option)
            }}
          />
        </>
      }
    </div>
  )
}

export default ShopSidebar
