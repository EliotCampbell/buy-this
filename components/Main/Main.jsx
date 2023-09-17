import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'
import { Product } from '@/models/models'

const Main = async () => {
  const highlights = await Product.findAll({
    limit: 8
  }).then((data) => data.map((el) => ({ ...el.dataValues })))

  const hotDeals = await Product.findAll({
    limit: 8
  }).then((data) => data.map((el) => ({ ...el.dataValues })))

  return (
    <div className={classes.main}>
      <CarouselBlock />
      <ItemsLine title={'HIGHLIGHTS'} products={highlights} />
      <ItemsLine title={'HOT DEALS'} products={hotDeals} />
    </div>
  )
}

export default Main
