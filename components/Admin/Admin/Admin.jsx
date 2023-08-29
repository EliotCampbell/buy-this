'use client'
import React, { useEffect } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { useAdminStore } from '@/store/adminStore/adminStore'

const Admin = () => {
  const { newProduct, setIsValid } = useAdminStore((state) => ({
    newProduct: state.newProduct,
    setIsValid: state.setIsValid
  }))

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
