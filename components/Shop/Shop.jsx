'use client'

import React, { useState } from 'react'
import classes from './Shop.module.css'
import ShopSidebar from './ShopSidebar/ShopSidebar'
import Products from './Products/Products'
import BreadCrumbs from '../UI/BreadCrumbs/BreadCrumbs'

const Shop = () => {
  return (
    <div className={classes.shop}>
      <div className={classes.side}>
        <BreadCrumbs />
        <ShopSidebar />
      </div>
      <Products />
    </div>
  )
}

export default Shop
