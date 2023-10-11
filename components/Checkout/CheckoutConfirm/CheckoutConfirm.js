import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import { checkout } from '@/http/fetchers/checkout'
import SummaryBlock from '@/components/Checkout/SummaryBlock/SummaryBlock'
import SummaryShoppingCart from '@/components/Checkout/SummaryShoppingCart/SummaryShoppingCart'
import { removeAllProductsFromCart } from '@/http/user/cart'
import { useRouter } from 'next/navigation'

const CheckoutConfirm = ({
  checkoutForm,
  cartProducts,
  setStep,
  productsCost,
  shippingCost,
  totalCost
}) => {
  const router = useRouter()
  const checkoutHandler = () =>
    checkout({
      ...checkoutForm,
      country: checkoutForm.country.value.country
    }).then((data) => {
      if (data.ok) {
        setStep('success')
        removeAllProductsFromCart().then(() => router.refresh())
      } else {
        alert('Error of placing order')
      }
    })
  return (
    <div className={classes.stepOverview}>
      <div className={classes.formWrapper}>
        <h1>CHECK YOUR ORDER</h1>
        <div className={classes.horizontalSplitter} />
        <p className={classes.checkoutData}>Please check your data carefully</p>
        <div className={classes.dataGroup}>
          <div className={classes.formTitle}>
            <p className={classes.formTitleText}>PAYMENT</p>
            <p
              className={classes.formTitleEdit}
              onClick={() => setStep('payment')}
            >
              Edit
            </p>
          </div>
          <p className={classes.checkoutData}>{checkoutForm.paymentMethod}</p>
        </div>
        <div className={classes.formRow}>
          <div className={classes.dataGroup}>
            <div className={classes.formTitle}>
              <p className={classes.formTitleText}>PERSONAL DATA</p>
              <p
                className={classes.formTitleEdit}
                onClick={() => setStep('address')}
              >
                Edit
              </p>
            </div>
            <p
              className={classes.checkoutData}
            >{`${checkoutForm.title}. ${checkoutForm.firstName} ${checkoutForm.lastName}`}</p>
            <p className={classes.checkoutData}>{checkoutForm.phoneNumber}</p>
            <p className={classes.checkoutData}>{checkoutForm.email}</p>
          </div>
          <div className={classes.formRowSplitter} />
          <div className={classes.dataGroup}>
            <div className={classes.formTitle}>
              <p className={classes.formTitleText}>ADDRESS</p>
              <p
                className={classes.formTitleEdit}
                onClick={() => setStep('address')}
              >
                Edit
              </p>
            </div>
            <p className={classes.checkoutData}>{checkoutForm.postalCode}</p>
            <p className={classes.checkoutData}>{checkoutForm.address}</p>
            <p
              className={classes.checkoutData}
            >{`${checkoutForm.city}, ${checkoutForm.country.value.country}`}</p>
          </div>
        </div>
        <SummaryShoppingCart cartProducts={cartProducts} />
      </div>
      <SummaryBlock
        checkoutHandler={checkoutHandler}
        productsCost={productsCost}
        shippingCost={shippingCost}
        totalCost={totalCost}
      />
    </div>
  )
}

export default CheckoutConfirm
