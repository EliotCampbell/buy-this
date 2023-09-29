import React from 'react'
import { getMyCart } from '@/getters'
import classes from './Checkout.module.css'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import AdminRadio from '@/components/UI/AdminInputs/AdminRadio/AdminRadio'
import CheckoutProductCard from '@/components/Checkout/CheckoutProductCard/CheckoutProductCard'

const Checkout = async () => {
  const cartProducts = await getMyCart()
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
        <div className={classes.stepOverview}>
          <div className={classes.formWrapper}>
            <p className={classes.formTitle}>PERSONAL INFORMATION & ADDRESS</p>
            <div className={classes.form}>
              <div className={classes.formRow}>
                <AdminInput
                  label={'Email'}
                  placeholder={'johannes.schmidt@example.com...'}
                />
                <div className={classes.formRowSplitter} />
                <AdminInput
                  label={'Phone number'}
                  placeholder={'+49 30 12345678...'}
                />
              </div>
              <AdminRadio options={['Mr', 'Mrs', 'Company']} />
              <AdminInput label={'First name'} placeholder={'Johannes...'} />
              <AdminInput label={'Last name'} placeholder={'Schmidt...'} />
              <AdminInput label={'Postal code'} placeholder={'10115...'} />
              <AdminInput
                label={'Address'}
                placeholder={'Schwarzwaldstraße 99...'}
              />
              <AdminInput label={'City'} placeholder={'Berlin...'} />
              <AdminReactSelect
                label={'Country'}
                options={[{ label: 'Germany', value: 'Germany' }]}
                placeholder={'Germany...'}
              />
            </div>
          </div>
          <div className={classes.summary}>
            <h3>YOUR ORDER</h3>
            {cartProducts.map((product) => (
              <CheckoutProductCard cartProduct={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
