'use client'

import React from 'react'
import classes from '@/components/Checkout/Checkout.module.css'
import Link from 'next/link'
import CheckoutProductsSummary from '@/components/Checkout/CheckoutProductCard/CheckoutProductsSummary'
import Button from '@/components/UI/Button/Button'

const SummaryBlock = ({ cartProducts, checkoutHandler }) => {
  return (
    <div className={classes.summary}>
      {!checkoutHandler && (
        <>
          <div className={classes.summaryTitle}>
            <p className={classes.summaryTitleText}>YOUR ORDER</p>
            <Link href={'/cart'}>
              <p className={classes.summaryEdit}>Edit...</p>
            </Link>
          </div>
          <CheckoutProductsSummary cartProducts={cartProducts} />
        </>
      )}

      <div className={classes.summaryTitle}>
        <p className={classes.summaryTitleText}>ORDER SUMMARY</p>
      </div>
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
      {checkoutHandler && (
        <Button onClick={() => checkoutHandler()}>BUY THIS!</Button>
      )}
    </div>
  )
}

export default SummaryBlock
