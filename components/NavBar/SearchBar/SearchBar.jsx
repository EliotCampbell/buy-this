'use client'

import React, { useState } from 'react'
import classes from './SearchBar.module.css'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  return (
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
  )
}

export default SearchBar
