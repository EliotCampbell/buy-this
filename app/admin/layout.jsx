import Admin from '@/components/Admin/Admin'
import classes from './adminLayout.module.css'
import React from 'react'

export default async function AdminLayout({ children }) {
  return (
    <div className={classes.adminLayout}>
      <Admin />
      {children}
    </div>
  )
}
