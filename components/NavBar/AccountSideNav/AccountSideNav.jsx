'use client'

import React, { useState } from 'react'
import classes from './AccountSideNav.module.css'
import { useUserStore } from '@/store/mainStore/store'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { logout } from '@/http/auth'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import { FiUser } from 'react-icons/fi'
import SideMenu from '@/components/NavBar/SideMenu/SideMenu'
import Login from '@/components/Login/Login'

const AccountSideNav = () => {
  const [accountSwitcher, setAccountSwitcher] = useState(false)

  const { user, setIsAuth, isAuth } = useUserStore((state) => ({
    isAuth: state.isAuth,
    user: state.user,
    setIsAuth: state.setIsAuth
  }))

  const logoutHandler = async () => {
    await logout().then((r) => r.ok && setIsAuth(false))
  }

  return (
    <>
      <IcoButton>
        <div onClick={() => setAccountSwitcher(true)}>
          <FiUser className={classes.ico} />
        </div>
      </IcoButton>
      {accountSwitcher && (
        <SideMenu setSwitcher={setAccountSwitcher}>
          {isAuth ? (
            <>
              <div className={classes.userLogout}>
                <h2>{user?.username}</h2>
                <Link
                  href={'/'}
                  className={classes.logoutDiv}
                  onClick={() => logoutHandler()}
                >
                  <BiLogOut className={classes.logoutIco} />
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
            <Login setAccountSwitcher={setAccountSwitcher} />
          )}
        </SideMenu>
      )}
    </>
  )
}

export default AccountSideNav
