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
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useProductStore, useUserStore } from '@/store/store'
import { BsPerson } from 'react-icons/bs'

const NavBar = () => {
  console.log(`Token in cookies: ${Cookies.get('token')} (sent from NavBar)`)

  useEffect(() => {
    useProductStore.getState().fetchCategories()
    useProductStore.getState().fetchBrands()
  }, [])

  const auth = localStorage.getItem('auth')

  const [searchQuery, setSearchQuery] = useState('')
  const [leftSwitcher, setLeftSwitcher] = useState(false)
  const [rightSwitcher, setRightSwitcher] = useState(false)

  const isAuth = useUserStore.getState().isAuth

  const router = useRouter()

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('userId')
    Cookies.remove('userEmail')
    Cookies.remove('userRole')
    useUserStore.setState({ isAuth: false })
  }

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
          {!auth && (
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
          {auth && (
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
