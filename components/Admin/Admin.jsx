'use client'
import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useMessageStore } from '@/store/messageStore/messageStore'

const Admin = () => {
  const { fetchAll } = useAdminListsStore((state) => ({
    fetchAll: state.fetchAll
  }))

  const { setTopbarMessage } = useMessageStore((state) => ({
    setTopbarMessage: state.setTopbarMessage
  }))

  useEffect(() => {
    fetchAll()
      .then()
      .catch((e) => {
        setTopbarMessage({
          ok: false,
          message: `Can not fetch`
        })
        console.log(e.message)
      })
  }, [])

  return <AdminSidebar />
}

export default Admin
