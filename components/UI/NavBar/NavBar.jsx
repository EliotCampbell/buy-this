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
import { useSessionStore, useUserStore } from '@/store/store'
import { BsPerson } from 'react-icons/bs'

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [leftSwitcher, setLeftSwitcher] = useState(false)
  const [rightSwitcher, setRightSwitcher] = useState(false)

  const logout = () => {
    useUserStore.setState({ user: {} })
    useSessionStore.setState({ isAuth: false })
  }
  const { isLoading, setIsLoading, setUser } = useUserStore((state) => ({
    isLoading: state.isLoading,
    setUser: state.setUser,
    setIsLoading: state.setIsLoading
  }))

  const { token, setToken, setIsAuth, isAuth } = useSessionStore((state) => ({
    token: state.token,
    isAuth: state.isAuth,
    setIsAuth: state.setIsAuth,
    setToken: state.setToken
  }))

  useEffect(() => {
    const checkAuth = async (token) => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user/auth_check',
          {
            method: 'POST',
            body: JSON.stringify({
              token
            })
          }
        )
        const data = await res.json()
        if (data.dataObject.newToken) {
          console.log(
            'New token is ' + data.dataObject.newToken + ' sent from NavBar.jsx'
          )
          setUser(data.dataObject.decodedUser)
          setIsAuth(true)
          setToken(data.dataObject.newToken)
        } else {
          setUser({})
          setIsAuth(false)
          setToken('')
        }
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth(token)
  }, [])
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
          {!isLoading && isAuth && (
            <div className={classes.sideButtonsDiv}>
              <IcoButton onClick={() => setRightSwitcher(true)}>
                <RiUserLine className={classes.ico} />
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
          {!isLoading && !isAuth && (
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
