'use client'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { useAdminStore } from '@/store/adminStore/adminStore'
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts
} from '@/http/fetchers/fetchers'
import { updateProduct } from '@/http/Admin/products'
import MessageString from '@/components/UI/MessageString/MessageString'
import Input from '@/components/UI/Input/Input'

const ProductUpdateForm = () => {
  const {
    isValid,
    reset,
    newProduct,
    brandsList,
    categoriesList,
    productsList,
    setNewProduct,
    setCategoriesList,
    setBrandsList,
    setProductsList,
    preview,
    setPreview
  } = useAdminStore((state) => ({
    setPreview: state.setPreview,
    productsList: state.productsList,
    preview: state.preview,
    isValid: state.isValid,
    categoriesList: state.categoriesList,
    brandsList: state.brandsList,
    newProduct: state.newProduct,
    setNewProduct: state.setNewProduct,
    setCategoriesList: state.setCategoriesList,
    setBrandsList: state.setBrandsList,
    setProductsList: state.setProductsList,
    reset: state.reset
  }))

  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchAllCategories(),
      fetchAllBrands(),
      fetchAllProducts()
    ]).then(([categoriesData, brandsData, productsData]) => {
      setCategoriesList(categoriesData.dataObject.categories)
      setBrandsList(brandsData.dataObject.brands)
      setProductsList(productsData.dataObject.products.rows)
      setIsLoaded(true)
    })
  }, [])

  const updatePro = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('name', newProduct.name)
    formData.append('price', newProduct.price.toString())
    formData.append('img', newProduct.file)
    formData.append('brandId', newProduct.brand.value)
    formData.append('categoryId', newProduct.category.value)
    formData.append('description', newProduct.description)
    updateProduct(newProduct.oldProductId, formData).then((r) => {
      setMessage(r)
      r.ok && reset()
      Promise.all([
        fetchAllCategories(),
        fetchAllBrands(),
        fetchAllProducts()
      ]).then(([categoriesData, brandsData, productsData]) => {
        setCategoriesList(categoriesData.dataObject.categories)
        setBrandsList(brandsData.dataObject.brands)
        setProductsList(productsData.dataObject.products.rows)
        setIsLoaded(true)
      })
    })
  }

  const inputRef = useRef()

  return isLoaded ? (
    <>
      <h1>UPDATE PRODUCT</h1>
      <div className={classes.formWrapper}>
        <form onSubmit={updatePro} className={classes.form}>
          <ReactSelect
            label={'Select product'}
            options={productsList}
            onChange={(option) => {
              setNewProduct({
                ...newProduct,
                category: {
                  label: categoriesList.find(
                    (el) =>
                      el.value.toString() === option.value.categoryId.toString()
                  ).label,
                  value: option.value.categoryId
                },
                brand: {
                  label: brandsList.find(
                    (el) =>
                      el.value.toString() === option.value.brandId.toString()
                  ).label,
                  value: option.value.brandId
                },
                name: option.value.name,
                price: option.value.price,
                description: option.value.description,
                oldProductId: option.value.id,
                file: option.value.img
              })
              setPreview(
                process.env.NEXT_PUBLIC_REACT_APP_API_URL +
                  `static/` +
                  option.value.img
              )
            }}
          ></ReactSelect>
          <ReactSelect
            value={newProduct.brand}
            label={'Choose brand'}
            options={brandsList}
            onChange={(option) => {
              setNewProduct({ ...newProduct, brandId: option })
            }}
          ></ReactSelect>
          <ReactSelect
            value={newProduct.category}
            label={'Choose category'}
            options={categoriesList}
            onChange={(option) =>
              setNewProduct({ ...newProduct, categoryId: option })
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
          <Button disabled={!isValid}>Update product</Button>
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
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default ProductUpdateForm
