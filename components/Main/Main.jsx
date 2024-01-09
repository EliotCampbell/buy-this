import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'
import { Brand, Product } from '@/models/models'
import commercelayer from '@commercelayer/sdk'

const organization = 'buy-this-2'
const accessToken =
  'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJPUk5NV0ZkYnZuIiwic2x1ZyI6ImJ1eS10aGlzLTIiLCJlbnRlcnByaXNlIjpmYWxzZX0sImFwcGxpY2F0aW9uIjp7ImlkIjoicHlhcWlnck9LcCIsImtpbmQiOiJpbnRlZ3JhdGlvbiIsInB1YmxpYyI6ZmFsc2V9LCJ0ZXN0Ijp0cnVlLCJleHAiOjE3MDQ4MDM5MjMsInJhbmQiOjAuOTc0NjQ0NDQ3MDg3MjkyOH0.2Htp0pOC5wfkX_5kEwcKq5Glk0FnSPHTeAsb5KRrPeGsX9r5eIZK2dXvDunILYUXlxiuPJA3YH6dlirX1cX5bA'

const cl = commercelayer({ organization, accessToken })

cl.skus.list().then(console.log)

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
