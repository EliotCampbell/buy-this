'use client'

import React, { useState } from 'react'
import classes from './NavBar.module.css'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { BsPerson } from 'react-icons/bs'
import IcoButton from '../IcoButton/IcoButton'
import { SlBasket } from 'react-icons/sl'
import { RiAdminLine } from 'react-icons/ri'
import { PiList } from 'react-icons/pi'
import CategorySideNav from './CategorySideNav'
import { BiLogOut } from 'react-icons/bi'
import RightSideNav from './AccountSideNav'
import UserStore from '../../../store/userStore'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const [leftSwitcher, setLeftSwitcher] = useState(false)
  const [rightSwitcher, setRightSwitcher] = useState(false)

  const logout = () => {
    signOut({ callbackUrl: '/' })
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  }

  const session = useSession()
  console.log(session)

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
          {session.data && (
            <>
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
            </>
          )}
          {!session.data && (
            <IcoButton>
              <div onClick={() => setRightSwitcher(true)}>
                <BsPerson className={classes.ico} />
              </div>
            </IcoButton>
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
