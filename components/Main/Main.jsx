import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'

const Main = async () => {
  const highlights = await fetch(
    'http://localhost:3000/api/product?limit=1'
  ).then((res) => res.json())
  const hotDeals = await fetch(
    'http://localhost:3000/api/product?limit=3'
  ).then((res) => res.json())

  return (
    <div className={classes.main}>
      <CarouselBlock />
      <ItemsLine
        title={'HIGHLIGHTS'}
        products={highlights?.dataObject?.products?.rows}
      />
      <ItemsLine
        title={'HOT DEALS'}
        products={hotDeals?.dataObject?.products?.rows}
      />
    </div>
  )
}

export default Main
