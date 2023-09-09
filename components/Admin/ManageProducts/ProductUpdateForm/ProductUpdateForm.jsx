'use client'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/Admin/AdminReactSelect/AdminReactSelect'
import AdminNewInput from '@/components/UI/Admin/AdminNewInput/AdminNewInput'
import MessageString from '@/components/UI/MessageString/MessageString'
import { updateProduct } from '@/http/Admin/products'
import AdminNewTextArea from '@/components/UI/Admin/AdminNewTextArea/AdminNewTextArea'

const ProductUpdateForm = () => {
  const { categoriesList, brandsList, fetchProductsList } = useAdminListsStore(
    (state) => ({
      categoriesList: state.categoriesList,
      brandsList: state.brandsList,
      fetchProductsList: state.fetchProductsList
    })
  )

  const { newProduct, setNewProduct, preview, setPreview, reset } =
    useAdminStore((state) => ({
      setPreview: state.setPreview,
      preview: state.preview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset
    }))

  const [message, setMessage] = useState(null)

  const createFormData = (newProduct) => {
    const formData = new FormData()
    formData.append('name', newProduct.name)
    formData.append('price', newProduct.price.toString())
    formData.append('img', newProduct.file)
    formData.append('brandId', newProduct.brand.value)
    formData.append('categoryId', newProduct.category.value)
    formData.append('description', newProduct.description)
    return formData
  }

  const updateHandler = async (product) => {
    await updateProduct(product.oldProductId, createFormData(product)).then(
      (r) => {
        setMessage(r)
        r.ok && reset()
      }
    )
    await fetchProductsList()
  }

  return (
    <>
      <div className={classes.formWithSidePreview}>
        <div className={classes.form}>
          <AdminNewInput
            placeholder={'Bicycle'}
            label={'Input product name'}
            value={newProduct.name}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(newProduct).then()
              }
            }}
          />
          <div className={classes.inputContainer}>
            <AdminReactSelect
              value={newProduct.brand}
              label={'Choose brand'}
              options={brandsList}
              onChange={(option) => {
                setNewProduct({ ...newProduct, brand: option })
              }}
            ></AdminReactSelect>
            <div className={classes.inputContainerVerticalSplitter}></div>
            <AdminReactSelect
              value={newProduct.category}
              label={'Choose category'}
              options={categoriesList}
              onChange={(option) =>
                setNewProduct({ ...newProduct, category: option })
              }
            ></AdminReactSelect>
          </div>
          <AdminNewInput
            placeholder={'47'}
            label={'Input product price'}
            value={newProduct.price}
            type={'number'}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(newProduct).then()
              }
            }}
          />
          <AdminNewTextArea
            placeholder={'Many words about it'}
            label={'Input product description'}
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value
              })
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(newProduct).then()
              }
            }}
          />
          <AdminNewInput
            type={'file'}
            accept={'.png,.jpg'}
            onChange={(e) => {
              setNewProduct({ ...newProduct, file: e.target.files[0] })
              setPreview(URL.createObjectURL(e.target.files[0]))
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(newProduct).then()
              }
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
          <div className={classes.horizontalSplitter}></div>
          {message && <MessageString message={message} />}

          <Button onClick={() => updateHandler(newProduct)}>
            Save product
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
