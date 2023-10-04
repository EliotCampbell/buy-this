import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import Button from '@/components/UI/Button/Button'

import SummaryBlock from '@/components/Checkout/SummaryBlock/SummaryBlock'

const CheckoutPaymentType = ({
  setStep,
  checkoutForm,
  setCheckoutForm,
  cartProducts,
  productsCost,
  shippingCost,
  totalCost
}) => {
  return (
    <div className={classes.stepOverview}>
      <div className={classes.formWrapper}>
        <h1>PAYMENT METHOD</h1>
        <div className={classes.horizontalSplitter} />
        <div className={classes.horizontalSplitter} />
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
          <div className={classes.paymentRow}>
            <input className={classes.radio} type={'radio'}></input>
            <p className={classes.paymentMethodTitle}>Crypto</p>
          </div>
          {checkoutForm.paymentMethod === 'crypto' && (
            <>
              <div className={classes.paymentMethodDescriptionWrapper}>
                <p className={classes.paymentMethodDescription}>
                  Pay by crypto through PayByCrypto.cc
                </p>
              </div>
              <div className={classes.paymentMethodButton}>
                <Button
                  onClick={(event) => {
                    event.preventDefault()
                    setStep('confirm')
                  }}
                >
                  CONTINUE
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <SummaryBlock
        cartProducts={cartProducts}
        productsCost={productsCost}
        shippingCost={shippingCost}
        totalCost={totalCost}
      />
    </div>
  )
}

export default CheckoutPaymentType
