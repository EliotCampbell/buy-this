'use client'

import React, { useState } from 'react'
import classes from './Shop.module.css'
import ShopSidebar from './ShopSidebar/ShopSidebar'
import Products from './Products/Products'
import BreadCrumbs from '../UI/BreadCrumbs/BreadCrumbs'

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('')

  return (
    <div className={classes.shop}>
      <div className={classes.side}>
        {/* <BreadCrumbs
          initialState={initialState}
          setSearch={setSearch}
          search={search}
        />*/}
        <ShopSidebar setSelectedCategory={setSelectedCategory} />
      </div>
      <Products selectedCategory={selectedCategory} />
    </div>
  )
}

export default Shop
