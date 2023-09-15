import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'

const Main = async () => {
  const highlights = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/product?limit=8',
    { next: { revalidate: 5 } }
  ).then((res) => res.json())
  const hotDeals = await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/product?limit=8'
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
