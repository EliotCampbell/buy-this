'use client'

import React from 'react'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'

const ManageUsers = () => {
  const { usersList } = useAdminListsStore((state) => ({
    usersList: state.usersList,
    fetchUsersList: state.fetchUsersList
  }))

  return (
    <>
      <h1>MANAGE USERS</h1>
      <div className={classes.formWithoutSidePreview}>
        <div className={classes.form}>
          {usersList.map((user) => (
            <div className={classes.listRow} key={user.value.id}>
              <p className={classes.title}>id:{user.value.id}</p>
              <p className={classes.title}>{user.value.username}</p>
              <p className={classes.title}>{user.value.email}</p>
              <p className={classes.title}> {user.value.role}</p>
              <p className={classes.title}>
                orders count:{user.value.orders.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ManageUsers
