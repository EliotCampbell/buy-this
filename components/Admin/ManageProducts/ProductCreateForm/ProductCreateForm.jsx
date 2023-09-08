'use client'

import React, { useRef, useState } from 'react'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/AdminReactSelect/AdminReactSelect'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'
import classes from '@/components/Admin/FormsStyles.module.css'
import ProductPreviewCard from '@/components/Shop/ProductPreviewCard/ProductPreviewCard'
import Button from '@/components/UI/Button/Button'
import { createProduct } from '@/http/Admin/products'
import MessageString from '@/components/UI/MessageString/MessageString'
import AdminNewTextArea from '@/components/UI/AdminNewTextArea/AdminNewTextArea'

const ProductCreateForm = () => {
  const { categoriesList, brandsList, fetchProductsList } = useAdminListsStore(
    (state) => ({
      categoriesList: state.categoriesList,
      brandsList: state.brandsList,
      fetchProductsList: state.fetchProductsList
    })
  )

  const { newProduct, preview, setNewProduct, setPreview, reset } =
    useAdminStore((state) => ({
      newProduct: state.newProduct,
      preview: state.preview,
      reset: state.reset,
      setNewProduct: state.setNewProduct,
      setPreview: state.setPreview
    }))

  const [message, setMessage] = useState(null)

  const inputRef = useRef()

  const createFormData = () => {
    const formData = new FormData()
    formData.append('name', newProduct.name)
    formData.append('price', newProduct.price.toString())
    formData.append('img', newProduct.file)
    formData.append('brandId', newProduct.brand.value)
    formData.append('categoryId', newProduct.category.value)
    formData.append('description', newProduct.description)
    return formData
  }

  const createHandler = async () => {
    await createProduct(createFormData()).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchProductsList()
  }

  return (
    <>
      <h1>Create product</h1>
      <div className={classes.formWithSidePreview}>
        <div className={classes.form}>
          <AdminNewInput
            label={'A new product name'}
            placeholder={'Name of the new product...'}
            value={newProduct.name}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
          ></AdminNewInput>
          <div className={classes.inputContainer}>
            <AdminReactSelect
              value={newProduct.brand === '' ? null : newProduct.brand}
              label={'Choose brand'}
              options={brandsList}
              onChange={(option) => {
                setNewProduct({ ...newProduct, brand: option })
              }}
            ></AdminReactSelect>
            <div className={classes.inputContainerHorizontalSplitter}></div>
            <AdminReactSelect
              value={newProduct.category === '' ? null : newProduct.category}
              label={'Choose category'}
              options={categoriesList}
              onChange={(option) =>
                setNewProduct({ ...newProduct, category: option })
              }
            ></AdminReactSelect>
          </div>

          <AdminNewInput
            value={newProduct.price}
            placeholder={'47...'}
            label={'Input product price'}
            type={'number'}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <AdminNewTextArea
            placeholder={'Many words about it...'}
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
          {message && <MessageString message={message} />}
          <Button onClick={() => createHandler()}>Create product</Button>
        </div>
        <div className={classes.productsCardWrapper}>
          <p className={classes.preview}>Preview</p>
          <ProductPreviewCard
            productId={newProduct.id}
            brandId={newProduct.brand.value}
            productName={newProduct.name === '' ? 'Name' : newProduct.name}
            productImg={preview}
            productPrice={newProduct.price}
          />
        </div>
      </div>
    </>
  )
}

export default ProductCreateForm
