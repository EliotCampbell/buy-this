'use client'

import React, { useEffect, useState } from 'react'
import classes from './NavBar.module.css'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import IcoButton from '../IcoButton/IcoButton'
import { SlBasket } from 'react-icons/sl'
import { RiAdminLine, RiUserLine } from 'react-icons/ri'
import { PiList } from 'react-icons/pi'
import CategorySideNav from './CategorySideNav'
import { BiLogOut } from 'react-icons/bi'
import RightSideNav from './AccountSideNav'
import Link from 'next/link'
import { useUserStore } from '@/store/store'
import { BsPerson } from 'react-icons/bs'

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [leftSwitcher, setLeftSwitcher] = useState(false)
  const [rightSwitcher, setRightSwitcher] = useState(false)

  const logout = () => {
    useUserStore.setState({ isAuth: false })
  }
  const isLoading = useUserStore((state) => state.isLoading)

  const { setIsLoading, isAuth } = useUserStore()

  const fetchNewToken = async () => {
    const res = await fetch('http://localhost:3000/api/user/auth_check', {
      method: 'POST',
      body: JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJnZXJhZG1pdHJ1a0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTI3OTEyNTIsImV4cCI6MTY5MjgzNDQ1Mn0.dh3SCyBbhqzRKBnkK2rmUknFfB6cg5Te6aIt7Nb-01g'
      })
    })
    return await res.json()
  }

  useEffect(() => {
    const token = fetchNewToken()
    useUserStore.setState({ user: token })
    console.log(useUserStore.getState())
  }, [])

  if (isLoading)
    return (
      <>
        {' '}
        <h1 style={{ color: 'red' }}>LOADING..</h1>
        <button onClick={() => useUserStore.setState({ isLoading: false })}>
          false
        </button>
      </>
    )
  else
    return (
      <div className={classes.navBarWrapper}>
        <div className={classes.navBar}>
          <div className={classes.rightDiv}>
            <div className={classes.brandWrapper}>
              <Link className={classes.brand} href={'/'}>
                BUY THIS!
              </Link>
            </div>
            <div className={classes.linksDiv}>
              <Link href={'/'} className={classes.navLink}>
                SOME NAV
              </Link>
              <Link href={'/'} className={classes.navLink}>
                SOME NAV
              </Link>
              <Link href={'/'} className={classes.navLink}>
                SOME NAV
              </Link>
              <Link href={'/'} className={classes.navLink}>
                SOME NAV
              </Link>
              <Link href={'/'} className={classes.navLink}>
                SOME NAV{' '}
              </Link>
              <div className={classes.splitter}></div>
              <Link href={'/'} className={classes.navLink}>
                BRANDS
              </Link>
              <Link href={'/'} className={classes.navLink}>
                SALE %
              </Link>
            </div>
          </div>

          <div className={classes.leftDiv}>
            <form className={classes.searchBar}>
              <input
                className={classes.searchInput}
                placeholder={'SEARCH FOR PRODUCTS'}
                onChange={(e) => {
                  setSearchQuery(e.target.value.toUpperCase())
                }}
                value={searchQuery}
              ></input>
              <div className={classes.glassWrapper}>
                <HiOutlineMagnifyingGlass className={classes.glass} />
              </div>
            </form>
            {!isAuth && (
              <div className={classes.sideButtonsDiv}>
                <IcoButton>
                  <Link href={'/admin'}>
                    <RiUserLine className={classes.ico} />
                  </Link>
                </IcoButton>
                <div className={classes.splitter}></div>
                <IcoButton>
                  <Link href={'/admin'}>
                    <RiAdminLine className={classes.ico} />
                  </Link>
                </IcoButton>
                <div className={classes.splitter}></div>
                <IcoButton>
                  <Link href={'/basket'}>
                    <SlBasket className={classes.ico} />
                  </Link>
                </IcoButton>
                <div className={classes.splitter}></div>
                <IcoButton onClick={() => logout()}>
                  <Link href={'/'}>
                    <BiLogOut className={classes.ico} />
                  </Link>
                </IcoButton>
              </div>
            )}
            {isAuth && (
              <div className={classes.sideButtonsDiv}>
                <div className={classes.sideButtonsDiv}>
                  <IcoButton>
                    <div onClick={() => setRightSwitcher(true)}>
                      <BsPerson className={classes.ico} />
                    </div>
                  </IcoButton>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={classes.subBar}>
          <div
            className={classes.categories}
            onClick={() => setLeftSwitcher(true)}
          >
            <PiList className={classes.ico} />
            <p className={classes.categoriesText}>ALL CATEGORIES</p>
          </div>
          <div className={classes.subBarContent}>
            <Link href={'/'} className={classes.subBarCategory}>
              CATEGORY
            </Link>
            <Link href={'/'} className={classes.subBarCategory}>
              CATEGORY
            </Link>
            <Link href={'/'} className={classes.subBarCategory}>
              CATEGORY
            </Link>
            <Link href={'/'} className={classes.subBarCategory}>
              CATEGORY
            </Link>
            <Link href={'/'} className={classes.subBarCategory}>
              CATEGORY
            </Link>
          </div>
        </div>
        {leftSwitcher && <CategorySideNav switcher={setLeftSwitcher} />}
        {rightSwitcher && <RightSideNav setSwitcher={setRightSwitcher} />}
      </div>
    )
}

export default NavBar
