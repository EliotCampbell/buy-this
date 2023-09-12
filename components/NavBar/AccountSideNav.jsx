import React from 'react'
import classes from './AccountSideNav.module.css'
import { RxCross1 } from 'react-icons/rx'
import Login from '@/components/Login/Login'
import { useUserStore } from '@/store/mainStore/store'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { logout } from '@/http/auth'

const LeftSideNav = ({ setSwitcher }) => {
  const { user, setIsAuth, isAuth } = useUserStore((state) => ({
    isAuth: state.isAuth,
    user: state.user,
    setIsAuth: state.setIsAuth
  }))

  const logoutHandler = async () => {
    await logout().then((r) => r.ok && setIsAuth(false))
  }

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
          <div className={classes.contentWrapper}>
            {isAuth ? (
              <>
                <div className={classes.userLogout}>
                  <h2>{user?.username}</h2>
                  <Link
                    href={'/'}
                    className={classes.logoutDiv}
                    onClick={() => logoutHandler()}
                  >
                    <BiLogOut className={classes.ico} />
                    <p className={classes.logoutP}>Logout</p>
                  </Link>
                </div>
                {user ? (
                  <>
                    <p className={classes.userInfo}>Id: {user.id}</p>
                    <p className={classes.userInfo}>E-mail: {user.email}</p>
                    <p className={classes.userInfo}>Role: {user.role}</p>
                  </>
                ) : (
                  <p className={classes.userInfo}>User not found!</p>
                )}
              </>
            ) : (
              <Login setSideMenuSwitcher={setSwitcher} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSideNav
