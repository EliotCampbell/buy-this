import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import AdminRadio from '@/components/UI/AdminInputs/AdminRadio/AdminRadio'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import Link from 'next/link'
import Button from '@/components/UI/Button/Button'
import CheckoutProductCard from '@/components/Checkout/CheckoutProductCard/CheckoutProductCard'

const CheckoutAddress = ({ cartProducts }) => {
  return (
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
        <Link href={'/checkout/payment'}>
          <Button>CONTINUE</Button>
        </Link>
      </div>
      <div className={classes.summary}>
        <h3>YOUR ORDER</h3>
        {cartProducts.map((product) => (
          <CheckoutProductCard cartProduct={product} />
        ))}
      </div>
    </div>
  )
}

export default CheckoutAddress
