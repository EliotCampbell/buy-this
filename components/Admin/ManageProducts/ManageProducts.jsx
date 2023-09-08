'use client'
import React from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { FiPlus } from 'react-icons/fi'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'
import { useRouter } from 'next/navigation'
import AdminProductsList from '@/components/UI/AdminProductsList/AdminProductsList'

const ManageProducts = () => {
  const { newProduct, setNewProduct } = useAdminStore((state) => ({
    newProduct: state.newProduct,
    setNewProduct: state.setNewProduct
  }))

  const router = useRouter()

  return (
    <>
      <h1>Manage Products</h1>
      <div className={classes.formWithoutSidePreview}>
        <AdminNewInput
          placeholder={'Add a new product...'}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              router.push('/admin/create_product')
            }
          }}
          onChange={(e) => {
            setNewProduct({ ...newProduct, name: e.target.value })
          }}
          value={newProduct.name}
        >
          <div className={classes.icoBlock}>
            <FiPlus
              className={classes.submitIco}
              onMouseDown={() => {
                router.push('/admin/create_product')
              }}
            />
          </div>
        </AdminNewInput>
        <AdminProductsList />
      </div>
    </>
  )
}

export default ManageProducts
