'use client'
import React, { useState } from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import ProductCreateForm from '@/components/Admin/ManageProducts/ProductCreateForm/ProductCreateForm'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { FiEdit2, FiPlus, FiTrash, FiX } from 'react-icons/fi'
import Button from '@/components/UI/Button/Button'
import { deleteProduct } from '@/http/Admin/products'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import ProductUpdateForm from '@/components/Admin/ManageProducts/ProductUpdateForm/ProductUpdateForm'
import Link from 'next/link'
import Image from 'next/image'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'

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

  const { newProduct, setPreview, setNewProduct, reset } = useAdminStore(
    (state) => ({
      setPreview: state.setPreview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset
    })
  )

  const deleteHandler = async (id) => {
    await deleteProduct(id).then((r) => {
      setMessage(r)
    })
    await fetchProductsList()
  }

  return (
    <>
      <h1>Manage Products</h1>
      <AdminNewInput
        placeholder={'Add new product...'}
        onFocus={() => {
          setAction('create')
        }}
      >
        <div className={classes.icoBlock}>
          {action === null && (
            <FiPlus
              className={classes.submitIco}
              onMouseDown={() => {
                setAction('create')
              }}
            />
          )}
          {action === 'create' && (
            <FiX
              className={classes.removeIco}
              onMouseDown={() => {
                setAction(null)
                reset()
              }}
            />
          )}
        </div>
      </AdminNewInput>
      {action === 'create' && <ProductCreateForm />}

      {productsList.map((el) => (
        <div className={classes.productsListRowWrapper}>
          <div className={classes.productsListRow} key={el.value.id}>
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
              {action === 'edit' && el.value.id === newProduct.oldProductId ? (
                <FiX
                  className={classes.removeIco}
                  onMouseDown={() => {
                    setAction(null)
                    reset()
                  }}
                />
              ) : (
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
              )}
              <FiTrash
                className={classes.removeIco}
                onMouseDown={() => deleteHandler(el.value.id)}
              />
            </div>
          </div>
          {action === 'edit' && el.value.id === newProduct.oldProductId && (
            <ProductUpdateForm />
          )}
        </div>
      ))}
    </>
  )
}

export default ManageProducts
