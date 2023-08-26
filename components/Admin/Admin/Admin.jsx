'use client'
import React, { useEffect, useState } from 'react'
import classes from './Admin.module.css'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { fetchCategories } from '@/http/fetchers/fetchers'

const Admin = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    newProduct,
    setIsValid,
    setPreview,
    message,
    setProductsList,
    setCategoriesList,
    setBrandsList,
    setMessage,
    newSpecification,
    setSpecificationsList,
    setSpecifications
  } = useAdminStore((state) => ({
    newProduct: state.newProduct,
    message: state.message,
    setIsValid: state.setIsValid,
    setPreview: state.setPreview,
    setBrandsList: state.setBrandsList,
    setProductsList: state.setProductsList,
    setCategoriesList: state.setCategoriesList,
    setSpecificationsList: state.setSpecificationsList,
    setMessage: state.setMessage,
    newSpecification: state.newSpecification,
    setSpecifications: state.specifications
  }))

  //validator

  useEffect(() => {
    newProduct.brandId === '' ||
    newProduct.categoryId === '' ||
    newProduct.name === '' ||
    newProduct.price === '' ||
    newProduct.description === ''
      ? setIsValid(false)
      : setIsValid(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProduct])

  //previewer

  useEffect(() => {
    if (newProduct.file === '') {
      return setPreview(process.env.REACT_APP_API_URL + 'noImg.jpg')
    }
    newProduct.file.name
      ? setPreview(URL.createObjectURL(newProduct.file))
      : setPreview(process.env.REACT_APP_API_URL + newProduct.file)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProduct.file])

  //show message and refetch

  useEffect(() => {
    if (message) {
      Promise.all([fetchCategories()])
        .then(([categoryData, brandData, productData]) => {
          setAdminCategories(categoryData.dataObject.categories)
          setAdminBrands(brandData.dataObject.brands)
          setAdminProductsCount(productData.dataObject.products.count)
          setAdminProducts(productData.dataObject.products.rows)

          // Update the state with the fetched data
          setProductsList(
            productData.dataObject.products.rows.map((el) => ({
              value: el,
              label: el.name
            }))
          )
          setCategoriesList(
            categoryData.dataObject.categories.map((el) => ({
              value: el.id,
              label: el.name
            }))
          )
          setBrandsList(
            brandData.dataObject.brands.map((el) => ({
              value: el.id,
              label: el.name
            }))
          )
          // Set a timeout to clear the message after 5000ms (5 seconds)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [message])

  //specifications fetcher

  useEffect(() => {
    if (newSpecification.productId !== '') {
      fetchSpecificationsByPId(newSpecification.productId).then((data) => {
        setSpecificationsList(
          data.dataObject.productSpecifications.map((el) => ({
            value: el.id,
            label: el.title
          }))
        )
        setSpecifications(data.dataObject.productSpecifications)
      })
    }
  }, [newSpecification.productId])

  //all products fetcher on first loading

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/product'
        )
        const data = await res.json()
        setAdminProducts(data.dataObject.products.rows)
        setAdminProductsCount(data.dataObject.products.count)
        setIsLoaded(true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchProducts().finally()
  }, [])

  const formData = new FormData()
  formData.append('name', newProduct.name)
  formData.append('price', newProduct.price.toString())
  formData.append('img', newProduct.file)
  formData.append('brandId', newProduct.brandId)
  formData.append('categoryId', newProduct.categoryId)
  formData.append('description', newProduct.description)

  return isLoaded ? (
    <>
      {message && (
        <div className={classes.messageDiv}>
          <p className={classes.message}>{message}</p>
        </div>
      )}
      <div className={classes.admin}>
        <AdminSidebar />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  )
}

export default Admin
