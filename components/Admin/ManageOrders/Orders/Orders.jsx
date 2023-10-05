'use client'
import React, { useState } from 'react'
import classes from './Orders.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { fetchOrderDetails } from '@/http/admin/orders'
import { FiPrinter, FiX } from 'react-icons/fi'

const Orders = () => {
  const { ordersList } = useAdminListsStore((state) => ({
    ordersList: state.ordersList,
    fetchUsersList: state.fetchUsersList
  }))
  const [orderDetails, setOrderDetails] = useState(null)
  return (
    <>
      <div className={classes.listTitleRow}>
        <p className={classes.tableTitleId}>ORDER ID</p>
        <p className={classes.tableTitleDate}>DATE</p>
        <p className={classes.tableTitleStatus}>STATUS</p>
        <p className={classes.tableTitleProductsCount}>ITEMS QUANTITY</p>
        <p className={classes.tableTitleAmount}>AMOUNT</p>
        <p className={classes.tableTitleCustomer}>CUSTOMER</p>
      </div>
      {ordersList.map((order) => (
        <div className={classes.listRowWrapper} key={order.value.id}>
          <div
            className={classes.listRow}
            onClick={() =>
              fetchOrderDetails(order.value.id).then((data) =>
                setOrderDetails(data.dataObject)
              )
            }
          >
            <p className={classes.tableId}>{order.value.id}</p>
            <p className={classes.tableDate}>
              {new Date(order.value.createdAt).toLocaleString()}
            </p>
            <p className={classes.tableStatus}>
              {`${order.value.orderStatus === 'new' && '●'} ${
                order.value.orderStatus
              }`}
            </p>
            <p className={classes.tableProductsCount}>
              {order.value.order_products.length}
            </p>

            <p className={classes.tableAmount}>{`${Number.parseFloat(
              order.value.amount
            ).toFixed(2)} €`}</p>
            <p className={classes.tableCustomer}>{order.value.email}</p>
          </div>
          {orderDetails?.orderId.toString() === order.value.id.toString() && (
            <div className={classes.orderDetailsWrapper}>
              <div className={classes.orderDetails}>
                <div className={classes.orderDetailsTitle}>
                  <p>{`ORDER #${order.value.id} DETAILS:`}</p>
                  <div className={classes.titleIcos}>
                    <FiPrinter
                      className={classes.x}
                      onClick={() => window.print()}
                    />
                    <FiX
                      className={classes.x}
                      onClick={() => setOrderDetails(null)}
                    />
                  </div>
                </div>
                <div className={classes.shippingInfoContainer}>
                  <div className={classes.recipient}>
                    <p className={classes.recipientText}>Recipient:</p>
                    <p className={classes.recipientText}>
                      {order.value.title +
                        '. ' +
                        order.value.firstName +
                        ' ' +
                        order.value.lastName}
                    </p>
                    <p className={classes.recipientText}>
                      {order.value.phoneNumber}
                    </p>
                    <p className={classes.recipientText}>{order.value.email}</p>
                  </div>
                  <div className={classes.address}>
                    <p className={classes.addressText}>Address:</p>
                    <p className={classes.addressText}>
                      {order.value.postalCode}
                    </p>
                    <p className={classes.addressText}>
                      {order.value.address + ','}
                    </p>
                    <p className={classes.addressText}>
                      {order.value.city + ','}
                    </p>
                    <p className={classes.addressText}>{order.value.country}</p>
                  </div>
                </div>
                <div className={classes.orderDetailsTitleRow}>
                  <p className={classes.orderDetailsTitleId}>ID</p>
                  <p className={classes.orderDetailsTitleName}>PRODUCT</p>
                  <p className={classes.orderDetailsTitleQuantity}>QUANTITY</p>
                  <p className={classes.orderDetailsTitlePrice}>PRICE</p>
                </div>
                {orderDetails.orderProducts.map((orderProduct) => (
                  <div
                    className={classes.orderDetailsRow}
                    key={orderProduct.id}
                  >
                    <p className={classes.orderDetailsId}>
                      {orderProduct.product.id}
                    </p>
                    <p className={classes.orderDetailsName}>
                      {orderProduct.product.name}
                    </p>
                    <p className={classes.orderDetailsQuantity}>
                      {orderProduct.quantity}
                    </p>
                    <p className={classes.orderDetailsPrice}>
                      {`${Number.parseFloat(orderProduct.price).toFixed(2)} €`}
                    </p>
                  </div>
                ))}
                <div className={classes.orderDetailsSummary}>
                  <p className={classes.orderDetailsId}>SUM:</p>
                  <p className={classes.orderDetailsName}></p>
                  <p className={classes.orderDetailsQuantity}>
                    {order.value.productsQuantity}
                  </p>
                  <p className={classes.orderDetailsPrice}>
                    {`${Number.parseFloat(order.value.amount).toFixed(2)} €`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default Orders
