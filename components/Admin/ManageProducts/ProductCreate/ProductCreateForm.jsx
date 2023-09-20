'use client'

import React, { useState } from 'react'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import classes from '@/components/Admin/FormsStyles.module.css'
import ProductPreviewCard from '@/components/Shop/ProductPreviewCard/ProductPreviewCard'
import Button from '@/components/UI/Button/Button'
import { createProduct } from '@/http/Admin/products'
import MessageString from '@/components/UI/MessageString/MessageString'
import AdminNewTextArea from '@/components/UI/AdminInputs/AdminNewTextArea/AdminNewTextArea'
import AdminCheckbox from '@/components/UI/AdminInputs/AdminCheckbox/AdminCheckbox'
import AdminFileInput from '@/components/UI/AdminInputs/AdminFileInput/AdminFileInput'
import { FaSpinner } from 'react-icons/fa6'

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

  const createHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    await createProduct(formData).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchProductsList()
  }

  const regExp = /^(?:[0-9]{1,8}(?:\.[0-9]{0,2})?|99999999(?:\.00?)?)$/

  return (
    <div className={classes.productCreateForm}>
      <div className={classes.formWithSidePreview}>
        <form
          className={classes.form}
          onSubmit={(event) => createHandler(event)}
        >
          <FaSpinner />
          <AdminInput
            label={'A new product name'}
            placeholder={'Name of the new product...'}
            value={newProduct.name}
            name={'name'}
            onChange={(e) => {
              setMessage(null)
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
          ></AdminInput>
          <div className={classes.inputContainer}>
            <AdminReactSelect
              value={newProduct.brand === '' ? null : newProduct.brand}
              label={'Choose brand'}
              options={brandsList}
              name={'brandId'}
              onChange={(option) => {
                setMessage(null)
                setNewProduct({ ...newProduct, brand: option })
              }}
            ></AdminReactSelect>
            <div className={classes.inputContainerVerticalSplitter}></div>
            <AdminReactSelect
              value={newProduct.category === '' ? null : newProduct.category}
              label={'Choose category'}
              options={categoriesList}
              name={'categoryId'}
              onChange={(option) => {
                setMessage(null)
                setNewProduct({ ...newProduct, category: option })
              }}
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
              value={newProduct.price}
              placeholder={'49.99...'}
              label={'Input product price'}
              name={'price'}
              onChange={(e) => {
                setMessage(null)
                if (regExp.test(e.target.value) || e.target.value === '')
                  setNewProduct({ ...newProduct, price: e.target.value })
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
              label={'Input product sale price'}
              name={'salePrice'}
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
            placeholder={'Many words about it...'}
            label={'Input product description'}
            value={newProduct.description}
            name={'description'}
            onChange={(e) => {
              setMessage(null)
              setNewProduct({
                ...newProduct,
                description: e.target.value
              })
            }}
          />
          <div className={classes.inputContainer}>
            <AdminCheckbox
              name={'highlight'}
              label={'Highlight'}
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
            label={'+ ADD PHOTO'}
            accept={'.png,.jpg'}
            name={'img'}
            onChange={(e) => {
              setMessage(null)
              setNewProduct({ ...newProduct, file: e.target.files[0] })
              setPreview(URL.createObjectURL(e.target.files[0]))
            }}
          />
          {message && (
            <div className={classes.messageDiv}>
              <MessageString message={message} setMessage={setMessage} />
            </div>
          )}
          <Button>Create product</Button>
        </form>
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
    </div>
  )
}

export default ProductCreateForm
