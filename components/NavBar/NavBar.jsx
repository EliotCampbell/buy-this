'use client'

import React, { useEffect, useState } from 'react'
import classes from './NavBar.module.css'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import IcoButton from '../UI/IcoButton/IcoButton'
import { PiList } from 'react-icons/pi'
import CategorySideNav from './CategorySideNav/CategorySideNav'
import AccountSideNav from './AccountSideNav/AccountSideNav'
import Link from 'next/link'
import { useProductStore, useUserStore } from '@/store/mainStore/store'
import { BsPerson } from 'react-icons/bs'
import CartSideNav from '@/components/NavBar/CartSideNav/CartSideNav'
import { fetchAllBrands, fetchAllCategories } from '@/http/fetchers/fetchers'
import { useShoppingCartStore } from '@/store/shoppingCartStore/shoppingCartStore'
import { checkAuthToken } from '@/http/auth'
import { FiShoppingCart, FiTool, FiUser } from 'react-icons/fi'

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [leftSwitcher, setLeftSwitcher] = useState(false)
  const [accountSwitcher, setAccountSwitcher] = useState(false)
  const [cartSwitcher, setCartSwitcher] = useState(false)

  const { isAuth, setIsAuth, setUser } = useUserStore((state) => ({
    isAuth: state.isAuth,
    setIsAuth: state.setIsAuth,
    setUser: state.setUser
  }))

  const { setBrands, setCategories } = useProductStore((state) => ({
    setBrands: state.setBrands,
    setCategories: state.setCategories
  }))

  const { cart } = useShoppingCartStore((state) => ({ cart: state.cart }))

  useEffect(() => {
    checkAuthToken().then((r) => {
      if (r?.ok === true) {
        setIsAuth(true)
        setUser(r.dataObject)
      } else {
        setIsAuth(false)
      }
    })
    fetchAllBrands().then((r) => setBrands(r.dataObject.brands))
    fetchAllCategories().then((r) => setCategories(r.dataObject.categories))
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
            <Link href={'/colors'} className={classes.navLink}>
              COLORS
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
            <Link href={'/brands'} className={classes.navLink}>
              BRANDS
            </Link>
            <Link href={'/sale'} className={classes.navLink}>
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
          {isAuth && (
            <div className={classes.sideButtonsDiv}>
              <IcoButton onClick={() => setAccountSwitcher(true)}>
                <FiUser className={classes.ico} />
              </IcoButton>
              <div className={classes.splitter}></div>
              <IcoButton>
                <Link href={'/admin'}>
                  <FiTool className={classes.ico} />
                </Link>
              </IcoButton>
              <div className={classes.splitter}></div>
              <IcoButton onClick={() => setCartSwitcher(true)}>
                <FiShoppingCart className={classes.ico} />
                <p className={classes.cartCounter}>
                  {cart.reduce((acc, el) => el.count + acc, 0)}
                </p>
              </IcoButton>
            </div>
          )}
          {!isAuth && (
            <div className={classes.sideButtonsDiv}>
              <div className={classes.sideButtonsDiv}>
                <IcoButton>
                  <div onClick={() => setAccountSwitcher(true)}>
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
      {accountSwitcher && <AccountSideNav setSwitcher={setAccountSwitcher} />}
      {cartSwitcher && (
        <CartSideNav setSwitcher={setCartSwitcher}>
          {
            <>
              <h3>{`DB shopping cart >>>>`}</h3>
            </>
          }
        </CartSideNav>
      )}
    </div>
  )
}

export default NavBar
