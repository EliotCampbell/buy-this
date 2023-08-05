import React from 'react'
import { observer } from 'mobx-react-lite'
import classes from './AdminSidebar.module.css'
import { Link } from 'react-router-dom'

const AdminSidebar = observer(({ linksArr }) => {
  return (
    <div className={classes.adminNav}>
      <div className={classes.categories}>
        {linksArr().map((el) => {
          if (el.title) {
            return (
              <div key={el.title} className={classes.adminNavTitleLink}>
                {el.title}
              </div>
            )
          } else {
            return (
              <Link key={el.path} to={el.path} className={classes.adminNavLink}>
                {el.linkName}
              </Link>
            )
          }
        })}
      </div>
    </div>
  )
})

export default AdminSidebar
