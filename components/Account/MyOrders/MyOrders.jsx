'use client'

import React, { useEffect, useState } from 'react'
import { getMyOrders } from '@/http/user/order'
import classes from './MyOrders.module.css'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  useEffect(() => {
    getMyOrders().then((data) => {
      setMyOrders(data.dataObject.orders)
    })
  }, [])
  return (
    <div>
      <h2>Your order history</h2>
      <div className={classes.listTitleRow}>
        <p className={classes.listTitleId}>ORDER №</p>
        <p className={classes.listTitleDate}>DATE</p>
        <p className={classes.listTitleQuantity}>QUANTITY</p>
        <p className={classes.listTitleStatus}>STATUS</p>
        <p className={classes.listTitleAmount}>AMOUNT</p>
        <p className={classes.listTitleDetails}></p>
      </div>
      {myOrders.map((order) => (
        <div key={order.id} className={classes.listRow}>
          <p className={classes.listId}>{order.id}</p>
          <p className={classes.listDate}>
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className={classes.listQuantity}>{order.productsQuantity}</p>
          <p className={classes.listStatus}>{order.orderStatus}</p>
          <p className={classes.listAmount}>{`${Number.parseFloat(
            order.amount
          ).toFixed(2)} €`}</p>
          <p className={classes.listDetails}>SHOW DETAILS</p>
        </div>
      ))}
    </div>
  )
}

export default MyOrders
