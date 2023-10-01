import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import AdminRadio from '@/components/UI/AdminInputs/AdminRadio/AdminRadio'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import Button from '@/components/UI/Button/Button'
import CheckoutProductCard from '@/components/Checkout/CheckoutProductCard/CheckoutProductCard'

const CheckoutAddress = ({
  setStep,
  cartProducts,
  user,
  checkoutForm,
  setCheckoutForm
}) => {
  return (
    <div className={classes.stepOverview}>
      <div className={classes.formWrapper}>
        <h1>PERSONAL INFORMATION & ADDRESS</h1>
        <div className={classes.form}>
          <p className={classes.formTitle}>CONTACTS</p>
          <div className={classes.formRow}>
            <AdminInput
              label={'Email'}
              placeholder={'johannes.schmidt@example.com...'}
              disabled={user.email}
              value={checkoutForm.email}
              onChange={(event) =>
                setCheckoutForm({ ...checkoutForm, email: event.target.value })
              }
            />
            <div className={classes.formRowSplitter} />
            <AdminInput
              label={'Phone number'}
              placeholder={'+49 30 12345678...'}
              disabled={user.phoneNumber}
              value={checkoutForm.phoneNumber}
              onChange={(event) =>
                setCheckoutForm({
                  ...checkoutForm,
                  phoneNumber: event.target.value
                })
              }
            />
          </div>
          <AdminRadio
            name={'title'}
            options={['Mr', 'Mrs', 'Company']}
            onChange={(event) => {
              setCheckoutForm({ ...checkoutForm, title: event.target.value })
            }}
          />
          <div className={classes.formRow}>
            <AdminInput
              label={'First name'}
              placeholder={'Johannes...'}
              value={checkoutForm.firstName}
              onChange={(event) =>
                setCheckoutForm({
                  ...checkoutForm,
                  firstName: event.target.value
                })
              }
            />
            <div className={classes.formRowSplitter} />
            <AdminInput
              label={'Last name'}
              placeholder={'Schmidt...'}
              value={checkoutForm.lastName}
              onChange={(event) =>
                setCheckoutForm({
                  ...checkoutForm,
                  lastName: event.target.value
                })
              }
            />
          </div>
          <p className={classes.formTitle}>ADDRESS</p>
          <div className={classes.formRow}>
            <div className={classes.postalCodeInputWrapper}>
              <AdminInput
                label={'Postal code'}
                placeholder={'10115...'}
                value={checkoutForm.postalCode}
                onChange={(event) =>
                  setCheckoutForm({
                    ...checkoutForm,
                    postalCode: event.target.value
                  })
                }
              />
            </div>
            <div className={classes.formRowSplitter} />
            <AdminInput
              label={'Address'}
              placeholder={'Schwarzwaldstraße 99...'}
              value={checkoutForm.address}
              onChange={(event) =>
                setCheckoutForm({
                  ...checkoutForm,
                  address: event.target.value
                })
              }
            />
          </div>
          <div className={classes.formRow}>
            <AdminInput
              label={'City'}
              placeholder={'Berlin...'}
              value={checkoutForm.city}
              onChange={(event) =>
                setCheckoutForm({ ...checkoutForm, city: event.target.value })
              }
            />
            <div className={classes.formRowSplitter} />
            <AdminReactSelect
              label={'Country'}
              options={[{ label: 'Germany', value: 'Germany' }]}
              placeholder={'Germany...'}
              value={checkoutForm.country}
              onChange={(option) =>
                setCheckoutForm({ ...checkoutForm, country: option })
              }
            />
          </div>
        </div>
        <div className={classes.horizontalSplitter} />
        <Button onClick={() => setStep('payment')}>CONTINUE</Button>
      </div>
      <div className={classes.summary}>
        <p className={classes.summaryTitle}>YOUR ORDER</p>
        <CheckoutProductCard cartProducts={cartProducts} />
        <p className={classes.summaryTitle}>ORDER SUMMARY</p>
        <div className={classes.formRow}>
          <p className={classes.summaryTextThin}>Total Product Value</p>
          <p className={classes.summaryText}>
            {Number.parseFloat(
              cartProducts.reduce(
                (acc, el) =>
                  el.onSale
                    ? el.discountPrice * el.quantity + acc
                    : el.price * el.quantity + acc,
                0
              )
            ).toFixed(2)}
          </p>
        </div>
        <div className={classes.formRow}>
          <p className={classes.summaryTextThin}>Shipping cost</p>
          <p className={classes.summaryText}>{'1,99 €'}</p>
        </div>
        <div className={classes.formRow}>
          <p className={classes.summaryTextThin}>Total amount incl. VAT</p>
          <p className={classes.summaryText}>
            {Number.parseFloat(
              cartProducts.reduce(
                (acc, el) =>
                  el.onSale
                    ? el.discountPrice * el.quantity + acc
                    : el.price * el.quantity + acc,
                1,
                99
              )
            ).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CheckoutAddress
