'use client'

import React, { useRef } from 'react'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/AdminReactSelect/AdminReactSelect'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'
import classes from '@/components/Admin/FormsStyles.module.css'

const ProductCreateForm = () => {
  const { categoriesList, brandsList } = useAdminListsStore((state) => ({
    categoriesList: state.categoriesList,
    brandsList: state.brandsList
  }))

  const { newProduct, setNewProduct, setPreview } = useAdminStore((state) => ({
    newProduct: state.newProduct,
    setNewProduct: state.setNewProduct,
    setPreview: state.setPreview
  }))

  const inputRef = useRef()

  return (
    <>
      <div className={classes.inputContainer}>
        <AdminReactSelect
          value={newProduct.brand === '' && null}
          label={'Choose brand'}
          options={brandsList}
          onChange={(option) => {
            setNewProduct({ ...newProduct, brand: option })
          }}
        ></AdminReactSelect>
        <div className={classes.inputContainerHorizontalSplitter}></div>
        <AdminReactSelect
          value={newProduct.category === '' && null}
          label={'Choose category'}
          options={categoriesList}
          onChange={(option) =>
            setNewProduct({ ...newProduct, category: option })
          }
        ></AdminReactSelect>
      </div>

      <AdminNewInput
        value={newProduct.price}
        placeholder={'47'}
        label={'Input product price'}
        type={'number'}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <AdminNewInput
        placeholder={'Many words about it'}
        label={'Input product description'}
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            description: e.target.value
          })
        }
      />
      <AdminNewInput
        ref={inputRef}
        type={'file'}
        accept={'.png,.jpg'}
        onChange={(e) => {
          setNewProduct({ ...newProduct, file: e.target.files[0] })
          setPreview(URL.createObjectURL(e.target.files[0]))
        }}
      />
    </>
  )
}

export default ProductCreateForm
