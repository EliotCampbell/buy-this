import React from 'react'
import classes from './AccountButtons.module.css'
import AccountSideNav from '@/components/NavBar/AccountSideNav/AccountSideNav'
import ShoppingCart from '@/components/NavBar/ShoppingCart/ShoppingCart'
import { cookies } from 'next/headers'
import { verifyJwt } from '@/utils'
import { CartProduct, Product } from '@/models/models'
import AdminSideNav from '@/components/NavBar/AdminSideNav/AdminSideNav'

const AccountButtons = async () => {
  const nextCookies = cookies()
  const token = nextCookies.get('token')?.value
  const payload = await verifyJwt(token)

  const getCartProducts = async (payload) => {
    if (payload?.id) {
      return await CartProduct.findAll({
        where: { userId: payload.id },
        include: [{ model: Product, as: 'product' }]
      }).then((data) => {
        return data.map((el) => ({
          cartProductId: el.dataValues.id,
          quantity: el.dataValues.quantity,
          ...el.dataValues.product.dataValues
        }))
      })
    } else return []
  }

  const cartProducts = await getCartProducts(payload)

  return (
    <div className={classes.sideButtonsDiv}>
      <AccountSideNav payload={payload} />
      {payload && (
        <>
          <div className={classes.splitter}></div>
          {payload.role === 'ADMIN' && (
            <>
              <AdminSideNav />
              <div className={classes.splitter}></div>
            </>
          )}
          <ShoppingCart cartProducts={cartProducts} />
        </>
      )}
    </div>
  )
}

export default AccountButtons
