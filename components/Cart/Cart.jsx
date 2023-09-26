import React from 'react'
import classes from './Cart.module.css'
import CartProductRow from '@/components/Cart/CartProductRow/CartProductRow'
import Button from '@/components/UI/Button/Button'
import { CartProduct, Product } from '@/models/models'
import { cookies } from 'next/headers'
import { verifyJwt } from '@/utils'

const Cart = async () => {
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
    <div className={classes.cartWrapper}>
      <h1>YOUR CART</h1>
      <div className={classes.rowTitles}>
        <p className={classes.rowTitleProduct}>PRODUCT</p>
        <p className={classes.rowTitleQuantity}>QUANTITY</p>
        <p className={classes.rowTitlePrice}>PRICE</p>
        <p className={classes.rowTitleSum}>SUM</p>
      </div>

      {cartProducts.map((product) => (
        <CartProductRow product={product} key={product.productId} />
      ))}

      <Button>CHECKOUT</Button>
    </div>
  )
}

export default Cart
