'use client'

import React from 'react'
import classes from './ShopSidebar.module.css'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import { useCustomRouter } from '@/components/Shop/useCustomRouter'
import { useSearchParams } from 'next/navigation'
import AdminCheckbox from '@/components/UI/AdminInputs/AdminCheckbox/AdminCheckbox'

const ShopSidebar = ({ categories, brands }) => {
  const searchParams = useSearchParams()
  const brandId = searchParams.get('brandId')
  const onSale = searchParams.get('onSale')
  const { setSearchParam, addSearchParam, removeSearchParam } =
    useCustomRouter()

  return (
    <div className={classes.shopNav}>
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
      <p className={classes.categories}>FILTER</p>
      <AdminReactSelect
        label={'Select brand'}
        options={brands.map((el) => ({
          value: el.id,
          label: el.name
        }))}
        value={
          brandId && {
            label: brands.find((el) => el.id.toString() === brandId).name
          }
        }
        onChange={(option) => {
          addSearchParam('brandId', option.value)
        }}
      />
      <AdminCheckbox
        label={'On sale'}
        wide
        checked={!!onSale}
        onChange={(event) => {
          if (event.target.checked) addSearchParam('onSale', true)
          else removeSearchParam('onSale')
        }}
      />
    </div>
  )
}

export default ShopSidebar
