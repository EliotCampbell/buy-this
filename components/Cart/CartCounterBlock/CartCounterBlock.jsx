'use client'
import React, { useEffect, useState } from 'react'
import Counter from '@/components/Shop/ProductDetails/ToCartBlock/Counter/Counter'
import { changeProductQuantity } from '@/http/cart'
import { useRouter } from 'next/navigation'

const CartCounterBlock = ({ product }) => {
  const [counter, setCounter] = useState(product.quantity)
  const router = useRouter()
  useEffect(() => {
    counter > 0 &&
      counter !== product.inStock &&
      changeProductQuantity(product.cartProductId, counter).then(() =>
        router.refresh()
      )
  }, [counter])
  return (
    <div>
      <Counter
        counter={counter}
        setCounter={setCounter}
        inStock={product.inStock}
      />
    </div>
  )
}

export default CartCounterBlock
