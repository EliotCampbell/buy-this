import React from 'react'
import classes from '@/app/cart/page.module.css'
import Checkout from '@/components/Checkout/Checkout'

const Page = () => {
  return (
    <div className={classes.page}>
      <Checkout />
    </div>
  )
}

export default Page
