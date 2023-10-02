'use client'

import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import Link from 'next/link'
import CheckoutProductCard from '@/components/Checkout/CheckoutProductCard/CheckoutProductCard'

const SummaryBlock = ({ cartProducts }) => {
  return (
    <div className={classes.summary}>
      <div className={classes.summaryTitle}>
        <p className={classes.summaryTitleText}>YOUR ORDER</p>
        <Link href={'/cart'}>
          <p className={classes.summaryEdit}>Edit...</p>
        </Link>
      </div>

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
  )
}

export default SummaryBlock
