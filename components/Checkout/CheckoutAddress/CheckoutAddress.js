import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import AdminRadio from '@/components/UI/AdminInputs/AdminRadio/AdminRadio'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import Button from '@/components/UI/Button/Button'
import SummaryBlock from '@/components/Checkout/SummaryBlock/SummaryBlock'

const CheckoutAddress = ({
  setStep,
  cartProducts,
  user,
  checkoutForm,
  setCheckoutForm
}) => {
  const regExp = /^\+[0-9]*$/
  return (
    <div className={classes.stepOverview}>
      <div className={classes.formWrapper}>
        <h1>PERSONAL INFORMATION & ADDRESS</h1>
        <form className={classes.form} onSubmit={() => setStep('payment')}>
          <div className={classes.formTitle}>
            <p className={classes.formTitleText}>CONTACTS</p>
          </div>
          <div className={classes.formRow}>
            <AdminInput
              label={'Email'}
              placeholder={'johannes.schmidt@example.com...'}
              disabled={user.email}
              required={true}
              value={checkoutForm.email}
              onChange={(event) =>
                setCheckoutForm({ ...checkoutForm, email: event.target.value })
              }
            />
            <div className={classes.formRowSplitter} />
            <AdminInput
              label={'Phone number'}
              placeholder={'included country code e.g.+49 30 12345678...'}
              disabled={user.phoneNumber}
              value={checkoutForm.phoneNumber}
              required={true}
              type={'tel'}
              onFocus={() =>
                !checkoutForm.phoneNumber &&
                setCheckoutForm({
                  ...checkoutForm,
                  phoneNumber: '+'
                })
              }
              onChange={(event) => {
                regExp.test(event.target.value) &&
                  setCheckoutForm({
                    ...checkoutForm,
                    phoneNumber: event.target.value
                  })
              }}
            />
          </div>
          <AdminRadio
            required={true}
            name={'title'}
            options={['Mr', 'Mrs', 'Company']}
            onChange={(event) => {
              setCheckoutForm({ ...checkoutForm, title: event.target.value })
            }}
          />
          <div className={classes.formRow}>
            <AdminInput
              required={true}
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
              required={true}
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
          <div className={classes.formTitle}>
            <p className={classes.formTitleText}>ADDRESS</p>
          </div>
          <div className={classes.formRow}>
            <div className={classes.postalCodeInputWrapper}>
              <AdminInput
                required={true}
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
              required={true}
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
              required={true}
              label={'City'}
              placeholder={'Berlin...'}
              value={checkoutForm.city}
              onChange={(event) =>
                setCheckoutForm({ ...checkoutForm, city: event.target.value })
              }
            />
            <div className={classes.formRowSplitter} />
            <AdminReactSelect
              required={true}
              label={'Country'}
              options={[{ label: 'Germany', value: 'Germany' }]}
              placeholder={'Germany...'}
              value={checkoutForm.country}
              onChange={(option) =>
                setCheckoutForm({ ...checkoutForm, country: option })
              }
            />
          </div>
          <div className={classes.horizontalSplitter} />
          <Button>CONTINUE</Button>
        </form>
      </div>
      <SummaryBlock cartProducts={cartProducts} />
    </div>
  )
}

export default CheckoutAddress
