'use client'

import React from 'react'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'

const ManageUsers = () => {
  const { usersList } = useAdminListsStore((state) => ({
    usersList: state.usersList,
    fetchUsersList: state.fetchUsersList
  }))
  console.log(usersList)

  return (
    <>
      <h1>MANAGE USERS</h1>
      <div className={classes.form}>
        {usersList.map((user) => (
          <div className={classes.listRow}>{user.value.username}</div>
        ))}
      </div>
    </>
  )
}

export default ManageUsers
