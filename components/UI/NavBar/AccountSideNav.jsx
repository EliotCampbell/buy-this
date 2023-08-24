import React from 'react'
import classes from './AccountSideNav.module.css'
import { RxCross1 } from 'react-icons/rx'
import Login from '@/components/Login/Login'
import { useSessionStore, useUserStore } from '@/store/store'

const LeftSideNav = ({ setSwitcher }) => {
  const { user } = useUserStore((state) => ({
    user: state.user
  }))
  const { isAuth } = useSessionStore((state) => ({ isAuth: state.isAuth }))

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
              <p className={classes.topText}>Account</p>
            </div>
          </div>
          <div className={classes.contentWrapper}>
            {isAuth ? (
              <>
                <h2>User data</h2>
                {user.id ? (
                  <>
                    <p className={classes.userInfo}>Id: {user?.id}</p>
                    <p className={classes.userInfo}>Email: {user?.email}</p>
                    <p className={classes.userInfo}>Role: {user?.role}</p>
                  </>
                ) : (
                  <p className={classes.userInfo}>User not found!</p>
                )}
              </>
            ) : (
              <Login sideMenuSwitcher={setSwitcher} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSideNav
