import React from 'react'
import classes from './CartSideNav.module.css'
import { RxCross1 } from 'react-icons/rx'

const ShoppingCart = ({ setSwitcher }) => {
  return (
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
              <p className={classes.topText}>Basket</p>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            <h2>Your shopping cart is still empty.</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
