import React from 'react'
import classes from './Users.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const Users = () => {
  const { usersList } = useAdminListsStore((state) => ({
    usersList: state.usersList,
    fetchUsersList: state.fetchUsersList
  }))
  return (
    <>
      <div className={classes.listTitleRow}>
        <p className={classes.listTitleId}>ID</p>
        <p className={classes.listTitleUsername}>USERNAME</p>
        <p className={classes.listTitleEmail}>EMAIL</p>
        <p className={classes.listTitleRole}>ROLE</p>
        <p className={classes.listTitleOrders}>ORDERS COUNT</p>
      </div>
      {usersList.map((user) => (
        <div className={classes.listRow} key={user.value.id}>
          <p className={classes.listId}>{user.value.id}</p>
          <p className={classes.listUsername}>{user.value.username}</p>
          <p className={classes.listEmail}>{user.value.email}</p>
          <p className={classes.listRole}> {user.value.role}</p>
          <p className={classes.listOrders}>
            orders count:{user.value.orders.length}
          </p>
        </div>
      ))}
    </>
  )
}

export default Users
