'use client'

import React, { useState } from 'react'
import classes from './AdminSideNav.module.css'
import IcoButton from '@/components/UI/IcoButton/IcoButton'
import SideMenu from '@/components/NavBar/SideMenu/SideMenu'
import Link from 'next/link'
import { linksArr } from './linksArr'
import { FiTool } from 'react-icons/fi'

const AdminSideNav = () => {
  const [adminSwitcher, setAdminSwitcher] = useState(false)

  return (
    <>
      <IcoButton>
        <div onClick={() => setAdminSwitcher(true)}>
          <FiTool className={classes.ico} />
        </div>
      </IcoButton>
      {adminSwitcher && (
        <SideMenu setSwitcher={setAdminSwitcher}>
          <div className={classes.userTitle}>
            <p className={classes.navTitle}>ADMIN PANEL</p>
          </div>
          <div className={classes.options}>
            {linksArr.map((el) => (
              <Link
                key={el.path}
                href={`/admin/${el.path}`}
                className={classes.navLink}
                onClick={() => setAdminSwitcher(false)}
              >
                <div className={classes.navIco}>{el.ico}</div>
                {el.linkName}
              </Link>
            ))}
          </div>
        </SideMenu>
      )}
    </>
  )
}

export default AdminSideNav
