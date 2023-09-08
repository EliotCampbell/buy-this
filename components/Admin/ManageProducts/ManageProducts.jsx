'use client'
import React from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import { useRouter } from 'next/navigation'
import AdminProductsList from '@/components/UI/Admin/AdminProductsList/AdminProductsList'
import Button from '@/components/UI/Button/Button'

const ManageProducts = () => {
  const router = useRouter()

  return (
    <>
      <h1>Manage Products</h1>
      <div className={classes.formWithoutSidePreview}>
        <Button
          style={'light'}
          onClick={() => router.push('/admin/create_product')}
        >
          + ADD PRODUCT...
        </Button>
        <AdminProductsList />
      </div>
    </>
  )
}

export default ManageProducts
