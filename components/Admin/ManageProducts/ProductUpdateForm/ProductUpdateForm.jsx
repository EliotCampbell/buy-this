'use client'
import React, { useRef, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/AdminReactSelect/AdminReactSelect'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'
import MessageString from '@/components/UI/MessageString/MessageString'
import { updateProduct } from '@/http/Admin/products'

const ProductUpdateForm = () => {
  const { categoriesList, brandsList, fetchProductsList } = useAdminListsStore(
    (state) => ({
      categoriesList: state.categoriesList,
      brandsList: state.brandsList,
      fetchProductsList: state.fetchProductsList
    })
  )

  const { isValid, newProduct, setNewProduct, preview, setPreview, reset } =
    useAdminStore((state) => ({
      setPreview: state.setPreview,
      preview: state.preview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset
    }))

  const inputRef = useRef()

  const [message, setMessage] = useState(null)

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

  const updateHandler = async () => {
    await updateProduct(newProduct.oldProductId, createFormData()).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchProductsList()
  }

  return (
    <>
      <h1>Edit product</h1>
      <div className={classes.formWithSidePreview}>
        <div className={classes.form}>
          <AdminReactSelect
            value={newProduct.brand}
            label={'Choose brand'}
            options={brandsList}
            onChange={(option) => {
              setNewProduct({ ...newProduct, brandId: option })
            }}
          ></AdminReactSelect>
          <AdminReactSelect
            value={newProduct.category}
            label={'Choose category'}
            options={categoriesList}
            onChange={(option) =>
              setNewProduct({ ...newProduct, categoryId: option })
            }
          ></AdminReactSelect>
          <AdminNewInput
            placeholder={'Bicycle'}
            label={'Input product name'}
            value={newProduct.name}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
          />
          <AdminNewInput
            placeholder={'47'}
            label={'Input product price'}
            value={newProduct.price}
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
          <Button
            onClick={() => {
              setNewProduct({ ...newProduct, file: 'noImg.jpg' })
              setPreview(
                process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'static/noImg.jpg'
              )
            }}
          >
            Remove image
          </Button>
          {message && <MessageString message={message} />}

          <Button disabled={!isValid} onClick={() => updateHandler()}>
            Update product
          </Button>
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

export default ProductUpdateForm
