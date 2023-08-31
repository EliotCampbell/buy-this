import React from 'react'
import ProductDetails from '@/components/Shop/ProductDetails/ProductDetails'
import classes from './page.module.css'

const Page = ({ params }) => {
  return (
    <div className={classes.page}>
      <ProductDetails productId={params.id} />
    </div>
  )
}

export default Page
