import React from 'react'
import ProductDetails from '@/components/Shop/ProductDetails/ProductDetails'

const Page = ({ params }) => {
  return (
    <>
      <ProductDetails productId={params.id} />
    </>
  )
}

export default Page
