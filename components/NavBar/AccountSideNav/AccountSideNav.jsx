'use client'

import React, { useState } from 'react'
import classes from './AccountSideNav.module.css'
import { BiLogOut } from 'react-icons/bi'
import { logout } from '@/http/user/auth'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import { FiUser } from 'react-icons/fi'
import SideMenu from '@/components/NavBar/SideMenu/SideMenu'
import Login from '@/components/Login/Login'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { linksArr } from './linksArr'

const AccountSideNav = ({ payload }) => {
  const [accountSwitcher, setAccountSwitcher] = useState(false)
  const router = useRouter()
  const logoutHandler = async () => {
    await logout().then(() => {
      setAccountSwitcher(false)
      router.refresh()
    })
  }

  console.log('')

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
              <div className={classes.userTitle}>
                <p className={classes.navTitle}>MANAGE ACCOUNT</p>
                <p>{payload.username}</p>
              </div>
              <div className={classes.options}>
                {linksArr.map((el) => (
                  <Link
                    key={el.path}
                    href={el.path}
                    className={classes.navLink}
                    onClick={() => setAccountSwitcher(false)}
                  >
                    <div className={classes.navIco}>{el.ico}</div>
                    {el.linkName}
                  </Link>
                ))}
              </div>
              <div
                className={classes.logoutDiv}
                onClick={() => logoutHandler().then(() => router.push('/'))}
              >
                <BiLogOut className={classes.logoutIco} />
                <p className={classes.logoutP}>Logout</p>
              </div>
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
