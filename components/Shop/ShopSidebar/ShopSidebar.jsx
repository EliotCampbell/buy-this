'use client'

import React, { useState } from 'react'
import classes from './ShopSidebar.module.css'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import { useCustomRouter } from '@/components/Shop/useCustomRouter'

const ShopSidebar = ({ categories }) => {
  const { setSearchParam } = useCustomRouter()

  const brands = []

  const [selectedBrand, setSelectedBrand] = useState(null)

  return (
    <div className={classes.shopNav}>
      {
        <>
          <p className={classes.categories}>CATEGORIES</p>
          {categories.map((el) => (
            <div
              className={classes.shopNavLink}
              key={el.id}
              onClick={() => setSearchParam('categoryId', el.id)}
            >
              {el.name}
            </div>
          ))}
        </>
      }
      {
        <>
          <p className={classes.categories}>FILTER</p>
          <AdminReactSelect
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
