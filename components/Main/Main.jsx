import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'
import { Product } from '@/models/models'
import DBShoppingCart from '@/components/NavBar/DBShoppingCart/DBShoppingCart'

const Main = async () => {
  const highlights = await Product.findAll({
    where: { highlight: true }
  }).then((data) => data.map((el) => ({ ...el.dataValues })))

  const hotDeals = await Product.findAll({
    where: { hotDeal: true }
  }).then((data) => data.map((el) => ({ ...el.dataValues })))

  return (
    <div className={classes.main}>
      <CarouselBlock />
      <ItemsLine title={'HIGHLIGHTS'} products={highlights} dark={true} />
      <ItemsLine title={'HOT DEALS'} products={hotDeals} />
      <DBShoppingCart />
    </div>
  )
}

export default Main
