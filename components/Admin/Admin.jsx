'use client'
import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const Admin = () => {
  const { newProduct, setIsValid } = useAdminStore((state) => ({
    newProduct: state.newProduct,
    setIsValid: state.setIsValid
  }))

  const { fetchAll } = useAdminListsStore((state) => ({
    fetchAll: state.fetchAll
  }))

  //fetch lists at first load

  useEffect(() => {
    fetchAll().then()
  }, [])

  //validator

  useEffect(() => {
    newProduct.brand === '' ||
    newProduct.category === '' ||
    newProduct.name === '' ||
    newProduct.price === '' ||
    newProduct.description === ''
      ? setIsValid(false)
      : setIsValid(true)
  }, [newProduct])

  return <AdminSidebar />
}

export default Admin
