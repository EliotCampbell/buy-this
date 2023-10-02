import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import Button from '@/components/UI/Button/Button'

import SummaryBlock from '@/components/Checkout/SummaryBlock/SummaryBlock'

const CheckoutPaymentType = ({
  setStep,
  checkoutForm,
  setCheckoutForm,
  cartProducts
}) => {
  return (
    <div className={classes.stepOverview}>
      <div className={classes.formWrapper}>
        <p className={classes.formTitle}>PAYMENT METHOD</p>
        <div
          className={
            checkoutForm.paymentMethod === 'crypto'
              ? classes.selectedPaymentMethod
              : classes.paymentMethod
          }
          onClick={() =>
            setCheckoutForm({ ...checkoutForm, paymentMethod: 'crypto' })
          }
        >
          <p className={classes.paymentMethodTitle}>Crypto</p>
          {checkoutForm.paymentMethod === 'crypto' && (
            <Button
              onClick={(event) => {
                event.preventDefault()
                setStep('confirm')
              }}
            >
              CONTINUE
            </Button>
          )}
        </div>
      </div>
      <SummaryBlock cartProducts={cartProducts} />
    </div>
  )
}

export default CheckoutPaymentType
