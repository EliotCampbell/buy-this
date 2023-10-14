'use client'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import MessageString from '@/components/UI/MessageString/MessageString'
import { updateProduct } from '@/http/Admin/products'
import AdminNewTextArea from '@/components/UI/AdminInputs/AdminNewTextArea/AdminNewTextArea'
import AdminCheckbox from '@/components/UI/AdminInputs/AdminCheckbox/AdminCheckbox'
import AdminFileInput from '@/components/UI/AdminInputs/AdminFileInput/AdminFileInput'
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

  const updateHandler = async (event, oldProductId) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    await updateProduct(oldProductId, formData).then((r) => {
      !r.ok && setMessage(r)
      r.ok && reset()
    })
    await fetchProductsList()
  }

  const regExp = /^(?:[0-9]{1,8}(?:\.[0-9]{0,2})?|99999999(?:\.00?)?)$/

  return (
    <>
      <div className={classes.formWithSidePreview}>
        <form
          className={classes.form}
          onSubmit={(event) => updateHandler(event, newProduct.oldProductId)}
        >
          <AdminInput
            placeholder={'Bicycle'}
            label={'Input product name'}
            value={newProduct.name}
            name={'name'}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(event, newProduct.oldProductId).then()
              }
            }}
          />
          <div className={classes.inputContainer}>
            <AdminReactSelect
              value={newProduct.brand}
              label={'Choose brand'}
              options={brandsList}
              name={'brandId'}
              onChange={(option) => {
                setNewProduct({ ...newProduct, brand: option })
              }}
            ></AdminReactSelect>
            <div className={classes.inputContainerVerticalSplitter}></div>
            <AdminReactSelect
              value={newProduct.category}
              label={'Choose category'}
              options={categoriesList}
              name={'categoryId'}
              onChange={(option) =>
                setNewProduct({ ...newProduct, category: option })
              }
            ></AdminReactSelect>
            <div className={classes.inputContainerVerticalSplitter}></div>
            <AdminInput
              value={newProduct.inStock}
              placeholder={'3...'}
              label={'In stock'}
              name={'inStock'}
              onChange={(e) => {
                setMessage(null)
                if (
                  /^(?:\d{1,3}|999)$/.test(e.target.value) ||
                  e.target.value === null ||
                  e.target.value === ''
                )
                  setNewProduct({
                    ...newProduct,
                    inStock: e.target.value
                  })
              }}
            />
          </div>
          <div className={classes.inputContainer}>
            <AdminInput
              placeholder={'49.99...'}
              label={'Input product price'}
              value={newProduct.price}
              type={'number'}
              name={'price'}
              onChange={(e) => {
                setMessage(null)
                if (regExp.test(e.target.value) || e.target.value === '')
                  setNewProduct({ ...newProduct, price: e.target.value })
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  updateHandler(event, newProduct.oldProductId).then()
                }
              }}
            />
            <div className={classes.inputContainerVerticalSplitter}></div>
            <AdminCheckbox
              label={'On sale'}
              name={'onSale'}
              onChange={(event) =>
                setNewProduct({ ...newProduct, onSale: event.target.checked })
              }
              checked={newProduct.onSale}
            />
            <div className={classes.inputContainerVerticalSplitter}></div>
            <AdminInput
              value={newProduct.discountPrice}
              placeholder={'29.99...'}
              label={'Input product sell price'}
              name={'sellPrice'}
              disabled={!newProduct.onSale}
              onChange={(e) => {
                setMessage(null)
                if (regExp.test(e.target.value) || e.target.value === '')
                  setNewProduct({
                    ...newProduct,
                    discountPrice: e.target.value
                  })
              }}
            />
          </div>
          <AdminNewTextArea
            placeholder={'Many words about it'}
            label={'Input product description'}
            value={newProduct.description}
            name={'description'}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value
              })
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(event, newProduct.oldProductId).then()
              }
            }}
          />
          <div className={classes.inputContainer}>
            <AdminCheckbox
              label={'Highlight'}
              name={'highlight'}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  highlight: event.target.checked
                })
              }
              checked={newProduct.highlight}
            />
            <div className={classes.inputContainerVerticalSplitter} />
            <AdminCheckbox
              name={'hotDeal'}
              label={'Hot deal'}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  hotDeal: event.target.checked
                })
              }
              checked={newProduct.hotDeal}
            />
          </div>
          <AdminFileInput
            label={'CHANGE PHOTO'}
            type={'file'}
            accept={'.png,.jpg'}
            name={'img'}
            onChange={(e) => {
              setNewProduct({ ...newProduct, file: e.target.files[0] })
              setPreview(URL.createObjectURL(e.target.files[0]))
            }}
          />
          <Button
            onClick={(event) => {
              event.preventDefault()
              setNewProduct({ ...newProduct, removeImg: true })
              setPreview(
                process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'static/noImg.jpg'
              )
            }}
          >
            Remove image
          </Button>
          <div className={classes.horizontalSplitter}></div>

          {message && (
            <div className={classes.messageDiv}>
              <MessageString message={message} />
            </div>
          )}
          <Button>Save product</Button>
        </form>
        <div className={classes.productsCardWrapper}>
          <p className={classes.preview}>Preview</p>
          <ProductPreviewCard
            productId={newProduct.id}
            brandId={newProduct.brand.value}
            productName={newProduct.name === '' ? 'Name' : newProduct.name}
            productImg={preview}
            productPrice={newProduct.price}
            discountPrice={newProduct.discountPrice}
            inStock={newProduct.inStock}
            onSale={newProduct.onSale}
          />
        </div>
      </div>
    </>
  )
}

export default ProductUpdateForm
