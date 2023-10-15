import React from 'react'
import classes from './Shop.module.css'
import ShopSidebar from './ShopSidebar/ShopSidebar'
import Products from './Products/Products'
import BreadCrumbs from '../UI/BreadCrumbs/BreadCrumbs'
import { getAllBrands, getAllCategories } from '@/getters'
import { fetchAllProducts } from '@/http/fetchers/fetchers'

const Shop = async ({ searchParams }) => {
  const categories = await getAllCategories()
  const brands = await getAllBrands()
  const products = await fetchAllProducts(searchParams)

  return (
    <div className={classes.shop}>
      <div className={classes.side}>
        <BreadCrumbs searchParams={searchParams} categories={categories} />
        <ShopSidebar categories={categories} brands={brands} />
      </div>
      <Products categories={categories} products={products.dataObject} />
    </div>
  )
}

export default Shop
