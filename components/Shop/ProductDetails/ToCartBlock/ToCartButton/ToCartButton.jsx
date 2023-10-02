'use client'

import React, { useState } from 'react'
import classes from './ToCartButton.module.css'
import { addProductToCart } from '@/http/cart'
import Button from '@/components/UI/Button/Button'
import { useRouter } from 'next/navigation'
import PopUp from '@/components/UI/PopUp/PopUp'

const ToCartButton = ({ product, counter }) => {
  const [popupMessage, setPopupMessage] = useState(null)
  const router = useRouter()
  return (
    <>
      <Button
        className={classes.cartButton}
        onClick={() =>
          addProductToCart(
            product.id,
            counter,
            product.onSale ? product.discountPrice : product.price
          ).then((data) => {
            router.refresh()
            setPopupMessage(data)
          })
        }
        disabled={counter <= 0 || counter > product.inStock}
      >
        ADD TO CART
      </Button>
      {popupMessage && (
        <PopUp message={popupMessage} setMessage={setPopupMessage} />
      )}
    </>
  )
}

export default ToCartButton
