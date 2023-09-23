'use client'

import React, { useEffect } from 'react'
import classes from './AccountButtons.module.css'
import AccountSideNav from '@/components/NavBar/AccountSideNav/AccountSideNav'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import Link from 'next/link'
import { FiTool } from 'react-icons/fi'
import { useUserStore } from '@/store/mainStore/store'
import { checkAuthToken } from '@/http/auth'
import ShoppingCart from '@/components/NavBar/ShoppingCart/ShoppingCart'

const AccountButtons = ({ cartProducts }) => {
  const { isAuth, setIsAuth, setUser, user } = useUserStore((state) => ({
    isAuth: state.isAuth,
    user: state.user,
    setIsAuth: state.setIsAuth,
    setUser: state.setUser
  }))

  useEffect(() => {
    checkAuthToken().then((r) => {
      if (r?.ok === true) {
        setIsAuth(true)
        setUser(r.dataObject)
      } else {
        setIsAuth(false)
      }
    })
  }, [])

  return (
    <div className={classes.sideButtonsDiv}>
      <AccountSideNav />
      {isAuth && (
        <>
          <div className={classes.splitter}></div>
          {user.role === 'ADMIN' && (
            <>
              <IcoButton>
                <Link href={'/admin'}>
                  <FiTool className={classes.ico} />
                </Link>
              </IcoButton>
              <div className={classes.splitter}></div>
            </>
          )}
          <ShoppingCart products={cartProducts} />
        </>
      )}
    </div>
  )
}

export default AccountButtons
