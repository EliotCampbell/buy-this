'use client'

import React, { useEffect, useState } from 'react'
import classes from '@/components/Account/account.module.css'
import { checkAuthToken } from '@/http/user/auth'
import HorizontalMenu from '@/components/UI/HorizontalMenu/HorizontalMenu'
import PersonalInformation from '@/components/Account/PersonalInformation/PersonalInformation'
import MyOrders from '@/components/Account/MyOrders/MyOrders'
import ChangePassword from '@/components/Account/ChangePassword/ChangePassword'

const Account = () => {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    checkAuthToken().then((data) => {
      setUserInfo(data.dataObject)
    })
  }, [])

  const menu = [
    {
      title: 'PERSONAL INFORMATION',
      component: <PersonalInformation userInfo={userInfo} />
    },
    { title: 'ORDERS', component: <MyOrders /> },
    { title: 'CHANGE PASSWORD', component: <ChangePassword /> }
  ]
  return (
    <div className={classes.account}>
      <h1>{`Hello, ${userInfo.username}!`}</h1>
      <p className={classes.userInfo}>Your customer ID: {userInfo.id}</p>
      <HorizontalMenu menu={menu} />
    </div>
  )
}

export default Account
