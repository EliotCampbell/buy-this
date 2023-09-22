import React from 'react'
import classes from './DBShoppingCart.module.css'
import Button from '@/components/UI/Button/Button'
import Link from 'next/link'
import { CartProduct, Product } from '@/models/models'
import DBShoppingCartPreview from '@/components/NavBar/DBShoppingCart/DBShoppingCartPreview/DBShoppingCartPreview'

const DBShoppingCart = async () => {
  const products = await CartProduct.findAll({
    where: { userId: 1 },
    include: [{ model: Product, as: 'product' }]
  }).then((data) =>
    data.map((el) => ({
      cartProduct: el.dataValues.id,
      quantity: el.dataValues.quantity,
      ...el.dataValues.product.dataValues
    }))
  )

  console.log(products)

  return (
    <div className={classes.shoppingCart}>
      <div className={classes.cartTitle}>
        <p className={classes.cartTitleName}>YOUR CART</p>
        <p className={classes.cartArticle}>
          {products.reduce((acc, el) => el.quantity + acc, 0) + ' Articles'}
        </p>
      </div>
      {products.length === 0 ? (
        <h3 className={classes.emptyMessage}>Your shopping cart is empty.</h3>
      ) : (
        <>
          {products.map((el) => (
            <DBShoppingCartPreview
              productId={el.id}
              productName={el.name}
              productPrice={el.price}
              productImg={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.img}`}
              quantity={el.quantity}
              onSale={el.onSale}
              discountPrice={el.discountPrice}
              key={el.cartProduct}
            />
          ))}
          <div className={classes.splitter}></div>
          <Link className={classes.link} href={'/checkout/cart'}>
            <Button>ORDER</Button>
          </Link>
        </>
      )}
      <div className={classes.amountDiv}>
        <p className={classes.totalAmount}>Total amount:</p>
        <p className={classes.totalAmount}>
          {`${Number.parseFloat(
            products.reduce(
              (acc, el) =>
                el.onSale
                  ? el.discountPrice * el.quantity + acc
                  : el.price * el.quantity + acc,
              0
            )
          ).toFixed(2)} €`}
        </p>
      </div>
    </div>
  )
}

export default DBShoppingCart
