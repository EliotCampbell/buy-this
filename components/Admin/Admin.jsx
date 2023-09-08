'use client'
import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const Admin = () => {
  const { fetchAll } = useAdminListsStore((state) => ({
    fetchAll: state.fetchAll
  }))

  useEffect(() => {
    fetchAll().then()
  }, [])

  return <AdminSidebar />
}

export default Admin
