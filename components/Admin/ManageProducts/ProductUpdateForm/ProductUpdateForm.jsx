'use client'
import React, { useRef } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { useAdminStore } from '@/store/adminStore/adminStore'
import Input from '@/components/UI/Input/Input'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import AdminReactSelect from '@/components/UI/AdminReactSelect/AdminReactSelect'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'

const ProductUpdateForm = () => {
  const { categoriesList, brandsList } = useAdminListsStore((state) => ({
    productsList: state.productsList,
    categoriesList: state.categoriesList,
    brandsList: state.brandsList
  }))

  const { isValid, newProduct, setNewProduct, preview, setPreview } =
    useAdminStore((state) => ({
      setPreview: state.setPreview,
      preview: state.preview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset
    }))

  const inputRef = useRef()

  return (
    <>
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
    </>
  )
}

export default ProductUpdateForm
