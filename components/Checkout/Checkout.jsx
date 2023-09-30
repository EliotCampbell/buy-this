'use client'
import React, { useEffect, useState } from 'react'
import classes from './Checkout.module.css'
import CheckoutAddress from '@/components/Checkout/CheckoutAddress/CheckoutAddress'
import { useRouter } from 'next/navigation'
import { getCart } from '@/http/cart'
import { checkAuthToken } from '@/http/auth'

const Checkout = () => {
  const [cartProducts, setCartProducts] = useState([])
  useEffect(() => {
    getCart().then((data) => setCartProducts(data.dataObject.products))
    checkAuthToken()
  }, [])
  const router = useRouter()

  return (
    <div className={classes.checkoutWrapper}>
      <div className={classes.checkout}>
        <div className={classes.steps}>
          <div className={classes.selectedStep}>
            <p className={classes.stepTitle}>1. ADDRESS</p>
          </div>
          <div className={classes.stepSplitter}></div>
          <div className={classes.step}>
            <p className={classes.stepTitle}>2. PAYMENT TYPE</p>
          </div>
          <div className={classes.stepSplitter}></div>
          <div className={classes.step}>
            <p className={classes.stepTitle}>3. CONFIRMATION</p>
          </div>
        </div>
        <CheckoutAddress cartProducts={cartProducts} />
      </div>
    </div>
  )
}

export default Checkout
