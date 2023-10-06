'use client'

import React from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import Users from '@/components/Admin/ManageUsers/Users/Users'

const ManageUsers = () => {
  return (
    <>
      <h1>MANAGE USERS</h1>
      <div className={classes.formWithoutSidePreview}>
        <div className={classes.form}>
          <Users />
        </div>
      </div>
    </>
  )
}

export default ManageUsers
