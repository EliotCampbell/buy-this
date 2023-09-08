import classes from '@/components/Admin/FormsStyles.module.css'
import Link from 'next/link'
import { FiCornerDownLeft, FiEdit2, FiTrash, FiX } from 'react-icons/fi'
import Image from 'next/image'
import ProductUpdateForm from '@/components/Admin/ManageProducts/ProductUpdateForm/ProductUpdateForm'
import React, { useState } from 'react'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { deleteProduct } from '@/http/Admin/products'

const AdminProductsList = () => {
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

  const [message, setMessage] = useState(null)

  const deleteHandler = async (id) => {
    await deleteProduct(id).then((r) => {
      setMessage(r)
    })
    await fetchProductsList()
  }

  return (
    <>
      {productsList.map((el) => (
        <div
          className={`${classes.productsListRowWrapper} ${
            el.value.id === newProduct.oldProductId && classes.changeBackground
          }`}
          key={el.value.id}
        >
          <div className={classes.productsListRow}>
            <div className={classes.productsInfo}>
              <Link href={'/product/' + el.value.id}>
                <FiCornerDownLeft className={classes.linkIco} />
              </Link>
              {el.value.id !== newProduct.oldProductId && (
                <>
                  <div className={classes.productMiniImgDiv}>
                    <Image
                      className={classes.productMiniImg}
                      alt={'image'}
                      src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.value.img}`}
                      fill={true}
                    />
                  </div>
                  <div className={classes.infoDiv}>
                    <p
                      className={classes.name}
                      key={el.value.id}
                      placeholder={'Edit...'}
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      {`${el.value.name} (ID:${el.value.id}) `}
                    </p>
                    <p className={classes.price}>{`${Number.parseFloat(
                      el.value.price
                    ).toFixed(2)} €`}</p>
                    <p className={classes.info}>{`Category: ${
                      categoriesList.find(
                        (element) =>
                          element.value.toString() ===
                          el.value.categoryId.toString()
                      ).label
                    }`}</p>
                    <p className={classes.info}>{`Brand: ${
                      brandsList.find(
                        (element) =>
                          element.value.toString() ===
                          el.value.brandId.toString()
                      ).label
                    }`}</p>
                    <p
                      className={classes.description}
                    >{`Description: ${el.value.description}`}</p>
                  </div>
                </>
              )}
              {el.value.id === newProduct.oldProductId && (
                <p className={classes.name}>{el.value.name}</p>
              )}
            </div>
            <div className={classes.icoBlock}>
              {el.value.id === newProduct.oldProductId ? (
                <FiX
                  className={classes.removeIco}
                  onMouseDown={() => {
                    reset()
                  }}
                />
              ) : (
                <FiEdit2
                  className={classes.editIco}
                  onMouseDown={() => {
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
          {el.value.id === newProduct.oldProductId && (
            <div className={classes.productEditInline}>
              <ProductUpdateForm />
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default AdminProductsList
