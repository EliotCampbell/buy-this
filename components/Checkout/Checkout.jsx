'use client'
import React, { useEffect, useState } from 'react'
import classes from './Checkout.module.css'
import CheckoutAddress from '@/components/Checkout/CheckoutAddress/CheckoutAddress'
import { getCart } from '@/http/user/cart'
import { checkAuthToken } from '@/http/user/auth'
import CheckoutPaymentType from '@/components/Checkout/CheckoutPaymentType/CheckoutPaymentType'
import CheckoutConfirm from '@/components/Checkout/CheckoutConfirm/CheckoutConfirm'
import CheckoutSuccess from '@/components/Checkout/CheckoutSuccess/CheckoutSuccess'

const Checkout = () => {
  const [step, setStep] = useState('address')
  const [cartProducts, setCartProducts] = useState([])
  const [user, setUser] = useState([])
  const [checkoutForm, setCheckoutForm] = useState({})
  const [shippingCost, setShippingCost] = useState(0)
  useEffect(() => {
    checkAuthToken()
      .then((data) => {
        setUser(data.dataObject)
        setCheckoutForm({ ...checkoutForm, email: data.dataObject.email })
      })
      .then(() => console.log(user))
    getCart().then((data) => setCartProducts(data.dataObject.products))
  }, [])

  const productsCost = Number.parseFloat(
    cartProducts.reduce(
      (acc, el) =>
        el.onSale
          ? el.salePrice * el.quantity + acc
          : el.price * el.quantity + acc,
      0
    )
  ).toFixed(2)

  const totalCost = Number.parseFloat(
    cartProducts.reduce(
      (acc, el) =>
        el.onSale
          ? el.salePrice * el.quantity + acc
          : el.price * el.quantity + acc,
      shippingCost
    )
  ).toFixed(2)

  return (
    <div className={classes.checkoutWrapper}>
      {step !== 'success' && (
        <div className={classes.steps}>
          <div
            className={step === 'address' ? classes.selectedStep : classes.step}
            onClick={() => setStep('address')}
          >
            <p
              className={
                step === 'address'
                  ? classes.selectedStepTitle
                  : classes.stepTitle
              }
            >
              1. ADDRESS
            </p>
          </div>
          <div className={classes.stepSplitter}></div>
          <div
            className={step === 'payment' ? classes.selectedStep : classes.step}
            onClick={() => step === 'confirm' && setStep('payment')}
          >
            <p
              className={
                step === 'payment'
                  ? classes.selectedStepTitle
                  : classes.stepTitle
              }
            >
              2. PAYMENT TYPE
            </p>
          </div>
          <div className={classes.stepSplitter}></div>
          <div
            className={step === 'confirm' ? classes.selectedStep : classes.step}
          >
            <p
              className={
                step === 'confirm'
                  ? classes.selectedStepTitle
                  : classes.stepTitle
              }
            >
              3. CONFIRMATION
            </p>
          </div>
        </div>
      )}
      {step === 'address' && (
        <CheckoutAddress
          setStep={setStep}
          cartProducts={cartProducts}
          user={user}
          checkoutForm={checkoutForm}
          setCheckoutForm={setCheckoutForm}
          productsCost={productsCost}
          shippingCost={shippingCost}
          setShippingCost={setShippingCost}
          totalCost={totalCost}
        />
      )}
      {step === 'payment' && (
        <CheckoutPaymentType
          setStep={setStep}
          cartProducts={cartProducts}
          checkoutForm={checkoutForm}
          setCheckoutForm={setCheckoutForm}
          productsCost={productsCost}
          shippingCost={shippingCost}
          totalCost={totalCost}
        />
      )}
      {step === 'confirm' && (
        <CheckoutConfirm
          setStep={setStep}
          cartProducts={cartProducts}
          checkoutForm={checkoutForm}
          productsCost={productsCost}
          shippingCost={shippingCost}
          totalCost={totalCost}
        />
      )}
      {step === 'success' && <CheckoutSuccess />}
    </div>
  )
}

export default Checkout
