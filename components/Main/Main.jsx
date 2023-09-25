import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'
import { Brand, Product } from '@/models/models'

const Main = async () => {
  const highlights = await Product.findAll({
    where: { highlight: true },
    include: { model: Brand, as: 'brand' }
  }).then((data) => {
    return data.map((el) => ({
      ...el.dataValues,
      brand: el.dataValues.brand.dataValues.name
    }))
  })

  const hotDeals = await Product.findAll({
    where: { hotDeal: true },
    include: { model: Brand, as: 'brand' }
  }).then((data) => {
    return data.map((el) => ({
      ...el.dataValues,
      brand: el.dataValues.brand.dataValues.name
    }))
  })

  return (
    <div className={classes.main}>
      <CarouselBlock />
      <ItemsLine title={'HIGHLIGHTS'} products={highlights} dark={true} />
      <ItemsLine title={'HOT DEALS'} products={hotDeals} />
    </div>
  )
}

export default Main
