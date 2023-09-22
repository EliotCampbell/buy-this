import React from 'react'
import classes from './CartSideNav.module.css'
import { RxCross1 } from 'react-icons/rx'
import ShoppingCart from '@/components/NavBar/ShoppingCart/ShoppingCart'

const CartSideNav = ({ setSwitcher, children }) => {
  return (
    <>
      <div className={classes.sideNavBack}>
        <div className={classes.exit} onClick={() => setSwitcher(false)}>
          <div
            className={classes.sideNav}
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <div className={classes.top}>
              <div
                className={classes.topTextWrapper}
                onClick={() => setSwitcher(false)}
              >
                <RxCross1 />
                <p className={classes.topText}>Cart</p>
              </div>
            </div>
            <div className={classes.contentWrapper}>
              <ShoppingCart />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartSideNav
