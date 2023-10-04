'use client'
import React from 'react'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'

const ManageOrders = () => {
  const { ordersList } = useAdminListsStore((state) => ({
    ordersList: state.ordersList,
    fetchUsersList: state.fetchUsersList
  }))

  return (
    <>
      <h1>MANAGE ORDERS</h1>
      <div className={classes.formWithoutSidePreview}>
        <div className={classes.form}>
          {ordersList.map((order) => (
            <div className={classes.listRow} key={order.value.id}>
              <p className={classes.title}>
                {new Date(order.value.createdAt).toLocaleString()}
              </p>
              <p className={classes.title}>id:{order.value.id}</p>
              <p className={classes.title}>status: {order.value.orderStatus}</p>
              <p className={classes.title}>{order.value.email}</p>
              <p className={classes.title}>{order.value.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ManageOrders
