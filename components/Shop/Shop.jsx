import React from 'react'
import classes from './Shop.module.css'
import ShopSidebar from './ShopSidebar/ShopSidebar'
import Products from './Products/Products'
import BreadCrumbs from '../UI/BreadCrumbs/BreadCrumbs'
import { getAllBrands, getAllCategories, getAllProducts } from '@/getters'

const Shop = async ({ searchParams }) => {
  const categories = await getAllCategories()
  const brands = await getAllBrands()
  const products = await getAllProducts(searchParams)

  return (
    <div className={classes.shop}>
      <div className={classes.side}>
        <BreadCrumbs searchParams={searchParams} categories={categories} />
        <ShopSidebar categories={categories} brands={brands} />
      </div>
      <Products categories={categories} products={products} />
    </div>
  )
}

export default Shop
