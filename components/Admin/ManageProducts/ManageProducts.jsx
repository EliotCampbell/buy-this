'use client'
import React, { useState } from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import AdminProductsList from '@/components/Admin/ManageProducts/AdminProductsList/AdminProductsList'
import Button from '@/components/UI/Button/Button'
import ProductCreateForm from '@/components/Admin/ManageProducts/ProductCreate/ProductCreateForm'
import { useAdminStore } from '@/store/adminStore/adminStore'

const ManageProducts = () => {
  const { reset } = useAdminStore((state) => ({
    reset: state.reset
  }))
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  return (
    <>
      <h1>MANAGE PRODUCTS</h1>
      <div className={classes.formWithoutSidePreview}>
        <div className={classes.addProductButtonDiv}>
          <Button
            style={'light'}
            onClick={() => {
              setShowNewProductForm(!showNewProductForm)
              reset()
            }}
          >
            {showNewProductForm ? 'X Cancel ' : '+ ADD PRODUCT...'}
          </Button>
        </div>
        {showNewProductForm && <ProductCreateForm />}
        <AdminProductsList setShowNewProductForm={setShowNewProductForm} />
      </div>
    </>
  )
}

export default ManageProducts
