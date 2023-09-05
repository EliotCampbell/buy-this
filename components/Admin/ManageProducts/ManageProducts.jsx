'use client'
import React, { useState } from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'
import ProductCreateForm from '@/components/Admin/ManageProducts/ProductCreateForm/ProductCreateForm'
import ProductPreviewCard from '@/components/Shop/ProductPreviewCard/ProductPreviewCard'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { FiEdit2, FiTrash, FiX } from 'react-icons/fi'
import Button from '@/components/UI/Button/Button'
import MessageString from '@/components/UI/MessageString/MessageString'
import {
  createProduct,
  deleteProduct,
  updateProduct
} from '@/http/Admin/products'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import ProductUpdateForm from '@/components/Admin/ManageProducts/ProductUpdateForm/ProductUpdateForm'
import Link from 'next/link'
import Image from 'next/image'

const ManageProducts = () => {
  const [message, setMessage] = useState(null)
  const [action, setAction] = useState(null)

  const { productsList, categoriesList, brandsList, fetchProductsList } =
    useAdminListsStore((state) => ({
      productsList: state.productsList,
      categoriesList: state.categoriesList,
      brandsList: state.brandsList,
      fetchProductsList: state.fetchProductsList
    }))

  const { newProduct, preview, setPreview, setNewProduct, reset, isValid } =
    useAdminStore((state) => ({
      preview: state.preview,
      setPreview: state.setPreview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset,
      isValid: state.isValid
    }))

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

  const updateHandler = async () => {
    await updateProduct(newProduct.oldProductId, createFormData()).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchProductsList()
  }

  const deleteHandler = async (id) => {
    await deleteProduct(id).then((r) => {
      setMessage(r)
    })
    await fetchProductsList()
  }

  return (
    <div className={classes.formDiv}>
      <h1>Manage Products</h1>
      <div className={classes.formWrapper}>
        <div className={classes.form}>
          {(action === null || action === 'create') && (
            <AdminNewInput
              label={'Add a new product'}
              placeholder={'Start typing a name of new product...'}
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value })
                setAction('create')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setAction(null)
                  reset()
                }
              }}
            >
              <div className={classes.icoBlock}>
                {action === 'create' && (
                  <FiX
                    className={classes.submitIco}
                    onMouseDown={() => {
                      setAction(null)
                      reset()
                    }}
                  />
                )}
              </div>
            </AdminNewInput>
          )}
          {action === 'create' && <ProductCreateForm />}
          {action === 'edit' && <ProductUpdateForm />}
          {message && <MessageString message={message} />}
          {action === 'create' && (
            <Button disabled={!isValid} onClick={() => createHandler()}>
              Create product
            </Button>
          )}
          {action === 'edit' && (
            <Button disabled={!isValid} onClick={() => updateHandler()}>
              Create product
            </Button>
          )}

          {productsList.map((el) => (
            <div className={classes.listRow} key={el.value.id}>
              <div className={classes.productMiniImgDiv}>
                <Image
                  className={classes.productMiniImg}
                  alt={'image'}
                  src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.value.img}`}
                  fill={true}
                />
              </div>

              <Link href={'/product/' + el.value.id}>
                <p
                  className={classes.name}
                  key={el.value.id}
                  placeholder={'Edit...'}
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  {el.value.name}
                </p>
              </Link>
              <div className={classes.icoBlock}>
                <FiEdit2
                  className={classes.editIco}
                  onMouseDown={() => {
                    setAction('edit')
                    setNewProduct({
                      ...newProduct,
                      category: {
                        label: categoriesList.find(
                          (element) =>
                            element.value.toString() ===
                            el.value.categoryId.toString()
                        ).label,
                        value: el.value.categoryId
                      },
                      brand: {
                        label: brandsList.find(
                          (element) =>
                            element.value.toString() ===
                            el.value.brandId.toString()
                        ).label,
                        value: el.value.brandId
                      },
                      name: el.value.name,
                      price: el.value.price,
                      description: el.value.description,
                      oldProductId: el.value.id,
                      file: el.value.img
                    })
                    setPreview(
                      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
                        `static/` +
                        el.value.img
                    )
                  }}
                />
                <FiTrash
                  className={classes.removeIco}
                  onMouseDown={() => deleteHandler(el.value.id)}
                />
              </div>
            </div>
          ))}
        </div>
        {(action === 'edit' || action === 'create') && (
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
        )}
      </div>
    </div>
  )
}

export default ManageProducts
