'use client'

import React, { useEffect, useState } from 'react'
import classes from './AccountSideNav.module.css'
import { BiLogOut } from 'react-icons/bi'
import { checkAuthToken, logout } from '@/http/user/auth'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import { FiUser } from 'react-icons/fi'
import SideMenu from '@/components/NavBar/SideMenu/SideMenu'
import Login from '@/components/Login/Login'
import { useRouter } from 'next/navigation'

const AccountSideNav = ({ payload }) => {
  const [accountSwitcher, setAccountSwitcher] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const router = useRouter()
  useEffect(() => {
    checkAuthToken().then((data) => {
      setUserInfo(data.dataObject)
      console.log(data)
    })
  }, [])
  const logoutHandler = async () => {
    await logout().then(() => {
      setAccountSwitcher(false)
      router.refresh()
    })
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
                <div
                  className={classes.logoutDiv}
                  onClick={() => logoutHandler().then(() => router.push('/'))}
                >
                  <BiLogOut className={classes.logoutIco} />
                  <p className={classes.logoutP}>Logout</p>
                </div>
              </div>
              {userInfo ? (
                <>
                  <p className={classes.userInfo}>Id: {userInfo.id}</p>
                  <p className={classes.userInfo}>Email: {userInfo.email}</p>
                  <p className={classes.userInfo}>Role: {userInfo.role}</p>
                  <p className={classes.userInfo}>
                    Username: {userInfo.username}
                  </p>
                  <p className={classes.userInfo}>
                    Address: {userInfo.address}
                  </p>
                  <p className={classes.userInfo}>
                    PostalCode: {userInfo.postalCode}
                  </p>
                  <p className={classes.userInfo}>City: {userInfo.city}</p>
                  <p className={classes.userInfo}>
                    Country: {userInfo.country}
                  </p>
                  <p className={classes.userInfo}>
                    PhoneNumber: {userInfo.phoneNumber}
                  </p>
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
