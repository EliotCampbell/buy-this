'use client'
import React from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import Orders from '@/components/Admin/ManageOrders/Orders/Orders'

const ManageOrders = () => {
  return (
    <>
      <h1>MANAGE ORDERS</h1>
      <div className={classes.formWithoutSidePreview}>
        <div className={classes.form}>
          <Orders />
        </div>
      </div>
    </>
  )
}

export default ManageOrders
