'use client'

import React, { useState } from 'react'
import classes from './AccountSideNav.module.css'
import Link from 'next/link'
import { BiLogOut } from 'react-icons/bi'
import { logout } from '@/http/auth'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import { FiUser } from 'react-icons/fi'
import SideMenu from '@/components/NavBar/SideMenu/SideMenu'
import Login from '@/components/Login/Login'

const AccountSideNav = ({ payload }) => {
  const [accountSwitcher, setAccountSwitcher] = useState(false)

  const logoutHandler = async () => {
    await logout().then()
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
          {payload ? (
            <>
              <div className={classes.userLogout}>
                <h2>{payload.username}</h2>
                <Link
                  href={'/'}
                  className={classes.logoutDiv}
                  onClick={() => logoutHandler()}
                >
                  <BiLogOut className={classes.logoutIco} />
                  <p className={classes.logoutP}>Logout</p>
                </Link>
              </div>
              {payload ? (
                <>
                  <p className={classes.userInfo}>Id: {payload.id}</p>
                  <p className={classes.userInfo}>E-mail: {payload.email}</p>
                  <p className={classes.userInfo}>Role: {payload.role}</p>
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
