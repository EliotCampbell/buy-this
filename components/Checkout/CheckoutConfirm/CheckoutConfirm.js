import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import Button from '@/components/UI/Button/Button'
import { checkout } from '@/http/fetchers/checkout'
import SummaryBlock from '@/components/Checkout/SummaryBlock/SummaryBlock'

const CheckoutConfirm = ({ checkoutForm, cartProducts }) => {
  const checkoutHandler = () =>
    checkout({ ...checkoutForm, country: checkoutForm.country.value })
  return (
    <div className={classes.stepOverview}>
      <div className={classes.formWrapper}>
        <p className={classes.formTitle}>CHECK YOUR ORDER</p>
        <p className={classes.checkoutData}>Please check your data carefully</p>
        <p className={classes.formTitle}>PERSONAL DATA</p>
        <p className={classes.checkoutData}>{checkoutForm.email}</p>
        <p className={classes.checkoutData}>{checkoutForm.phoneNumber}</p>
        <p className={classes.checkoutData}>{checkoutForm.firstName}</p>
        <p className={classes.checkoutData}>{checkoutForm.lastName}</p>
        <p className={classes.formTitle}>ADDRESS</p>
        <p className={classes.checkoutData}>{checkoutForm.postalCode}</p>
        <p className={classes.checkoutData}>{checkoutForm.address}</p>
        <p className={classes.checkoutData}>{checkoutForm.city}</p>
        <p className={classes.checkoutData}>{checkoutForm.country.value}</p>
        <p className={classes.formTitle}>PAYMENT</p>
        <p className={classes.checkoutData}>{checkoutForm.paymentMethod}</p>
        <Button onClick={() => checkoutHandler()}>BUY THIS!</Button>
      </div>
      <SummaryBlock cartProducts={cartProducts} />
    </div>
  )
}

export default CheckoutConfirm
