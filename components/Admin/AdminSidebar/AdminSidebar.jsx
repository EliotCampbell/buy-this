import React from 'react'
import classes from './AdminSidebar.module.css'
import Link from 'next/link'
import { linksArr } from '@/app/admin/linksArr'

const AdminSidebar = () => {
  return (
    <div className={classes.adminNav}>
      <div className={classes.categories}>
        {linksArr.map((el) => {
          if (el.title) {
            return (
              <div key={el.title} className={classes.adminNavTitleLink}>
                {el.title}
              </div>
            )
          } else {
            return (
              <Link
                key={el.path}
                href={'/admin/' + el.path}
                className={classes.adminNavLink}
              >
                {el.linkName}
              </Link>
            )
          }
        })}
      </div>
    </div>
  )
}

export default AdminSidebar
