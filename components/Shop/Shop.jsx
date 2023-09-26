import React from 'react'
import classes from './Shop.module.css'
import ShopSidebar from './ShopSidebar/ShopSidebar'
import Products from './Products/Products'
import BreadCrumbs from '../UI/BreadCrumbs/BreadCrumbs'
import { Category } from '@/models/models'
import { getAllProducts } from '@/getters'

const Shop = async ({ searchParams }) => {
  const categories = await Category.findAll().then((data) =>
    data.map((category) => category.get({ plain: true }))
  )
  const products = await getAllProducts(searchParams)

  return (
    <div className={classes.shop}>
      <div className={classes.side}>
        <BreadCrumbs />
        <ShopSidebar categories={categories} />
      </div>
      <Products categories={categories} products={products} />
    </div>
  )
}

export default Shop
