import React from 'react'
import classes from './SideMenu.module.css'
import { RxCross1 } from 'react-icons/rx'

const SideMenu = ({ children, setSwitcher }) => {
  return (
    <div className={classes.sideNavBack}>
      <div className={classes.exit} onMouseDown={() => setSwitcher(false)}>
        <div
          className={classes.sideNav}
          onMouseDown={(event) => {
            event.stopPropagation()
          }}
        >
          <div className={classes.top}>
            <div
              className={classes.topTextWrapper}
              onClick={() => setSwitcher(false)}
            >
              <RxCross1 />
              <p className={classes.topText}>Account</p>
            </div>
          </div>
          <div className={classes.contentWrapper}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default SideMenu
