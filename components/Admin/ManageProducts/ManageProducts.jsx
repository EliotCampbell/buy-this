'use client'
import React, { useState } from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import AdminProductsList from '@/components/Admin/ManageProducts/AdminProductsList/AdminProductsList'
import Button from '@/components/UI/Button/Button'
import ProductCreateForm from '@/components/Admin/ManageProducts/ProductCreate/ProductCreateForm'
import { useAdminStore } from '@/store/adminStore/adminStore'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const ManageProducts = () => {
  const { reset } = useAdminStore((state) => ({
    reset: state.reset
  }))
  const { fetchProductsList } = useAdminListsStore((state) => ({
    fetchProductsList: state.fetchProductsList
  }))
  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const [search, setSearch] = useState('')
  return (
    <>
      <h1>MANAGE PRODUCTS</h1>
      <div className={classes.formWithoutSidePreview}>
        <AdminInput
          label={'Search products'}
          onChange={(event) => {
            setSearch(event.target.value)
            fetchProductsList({ search: event.target.value }).then()
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              fetchProductsList({ search: event.target.value }).then()
            }
          }}
          value={search}
        />
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
