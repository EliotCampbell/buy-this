import React from 'react'
import classes from './NavBar.module.css'
import CategorySideNav from './CategorySideNav/CategorySideNav'
import Link from 'next/link'
import SearchBar from '@/components/NavBar/SearchBar/SearchBar'
import AccountButtons from '@/components/NavBar/AccountButtons/AccountButtons'

const NavBar = async () => {
  // const { setBrands, setCategories } = useProductStore((state) => ({
  //   setBrands: state.setBrands,
  //   setCategories: state.setCategories
  // }))
  //

  // useEffect(() => {
  //   fetchAllBrands().then((r) => setBrands(r.dataObject.brands))
  //   fetchAllCategories().then((r) => setCategories(r.dataObject.categories))
  // }, [])
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
          <SearchBar />
          <AccountButtons />
        </div>
      </div>
      <div className={classes.subBar}>
        <CategorySideNav />
        <div className={classes.subBarContent}>
          <Link href={'/'} className={classes.subBarCategory}>
            CATEGORY 1
          </Link>
          <Link href={'/'} className={classes.subBarCategory}>
            CATEGORY 2
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar
