import React from 'react'
import classes from './AdminSidebar.module.css'
import Link from 'next/link'
import { linksArr } from '@/app/admin/linksArr'

const AdminSidebar = () => {
  return (
    <div className={classes.adminNav}>
      <div className={classes.categories}>
        <p className={classes.adminNavTitle}>Choose to manage</p>
        {linksArr.map((el) => (
          <Link
            key={el.path}
            href={'/admin/' + el.path}
            className={classes.adminNavLink}
          >
            <div className={classes.ico}>{el.ico}</div>
            {el.linkName}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
