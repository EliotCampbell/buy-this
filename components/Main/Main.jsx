import React from 'react'
import CarouselBlock from './CarouselBlock/CarouselBlock'
import classes from './Main.module.css'
import ItemsLine from './ItemsLine/ItemsLine'

const Main = ({ highlights }) => {
  return (
    <div className={classes.main}>
      <CarouselBlock />
      <ItemsLine title={'HIGHLIGHTS'} products={highlights} dark={true} />
      <ItemsLine title={'HOT DEALS'} products={[]} />
    </div>
  )
}

export default Main

export const dynamic = 'force-dynamic'
