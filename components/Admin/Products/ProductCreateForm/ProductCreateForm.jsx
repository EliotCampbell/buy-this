'use client'

import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { createProduct } from '@/http/Admin/products'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { fetchAllBrands, fetchAllCategories } from '@/http/fetchers/fetchers'
import MessageString from '@/components/UI/MessageString/MessageString'

const ProductCreateForm = () => {
  const {
    isValid,
    reset,
    newProduct,
    brandsList,
    categoriesList,
    setNewProduct,
    setCategoriesList,
    setBrandsList,
    preview,
    setPreview
  } = useAdminStore((state) => ({
    preview: state.preview,
    isValid: state.isValid,
    categoriesList: state.categoriesList,
    brandsList: state.brandsList,
    newProduct: state.newProduct,
    setNewProduct: state.setNewProduct,
    setCategoriesList: state.setCategoriesList,
    setBrandsList: state.setBrandsList,
    reset: state.reset,
    setPreview: state.setPreview
  }))

  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Promise.all([fetchAllCategories(), fetchAllBrands()]).then(
      ([categoriesData, brandsData]) => {
        setCategoriesList(categoriesData.dataObject.categories)
        setBrandsList(brandsData.dataObject.brands)
        setIsLoaded(true)
      }
    )
  }, [])

  const createPro = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('name', newProduct.name)
    formData.append('price', newProduct.price.toString())
    formData.append('img', newProduct.file)
    formData.append('brandId', newProduct.brand.value)
    formData.append('categoryId', newProduct.category.value)
    formData.append('description', newProduct.description)
    createProduct(formData).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  const inputRef = useRef()

  return isLoaded ? (
    <div>
      <h1>CREATE NEW PRODUCT</h1>
      <div className={classes.formWrapper}>
        <form onSubmit={createPro} className={classes.form}>
          <ReactSelect
            value={newProduct.brand}
            label={'Choose brand'}
            options={brandsList}
            onChange={(option) => {
              setNewProduct({ ...newProduct, brand: option })
            }}
          ></ReactSelect>
          <ReactSelect
            value={newProduct.category}
            label={'Choose category'}
            options={categoriesList}
            onChange={(option) =>
              setNewProduct({ ...newProduct, category: option })
            }
          ></ReactSelect>
          <Input
            placeholder={'Bicycle'}
            label={'Input product name'}
            value={newProduct.name}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
          />
          <Input
            placeholder={'47'}
            label={'Input product price'}
            value={newProduct.price}
            type={'number'}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <Input
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
          <Input
            ref={inputRef}
            type={'file'}
            accept={'.png,.jpg'}
            onChange={(e) => {
              setNewProduct({ ...newProduct, file: e.target.files[0] })
              setPreview(URL.createObjectURL(e.target.files[0]))
            }}
          />
          {message && <MessageString message={message} />}
          <Button disabled={!isValid}>Create product</Button>
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
  ) : (
    <h1>Loading...</h1>
  )
}

export default ProductCreateForm
