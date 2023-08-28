'use client'
import React, { useEffect, useState } from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { useAdminStore } from '@/store/adminStore/adminStore'

const Admin = () => {
  const {
    newProduct,
    setIsValid,
    setPreview,
    newSpecification,
    setSpecificationsList,
    setSpecifications
  } = useAdminStore((state) => ({
    newProduct: state.newProduct,
    setIsValid: state.setIsValid,
    setPreview: state.setPreview,
    setSpecificationsList: state.setSpecificationsList,
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

  const formData = new FormData()
  formData.append('name', newProduct.name)
  formData.append('price', newProduct.price.toString())
  formData.append('img', newProduct.file)
  formData.append('brandId', newProduct.brandId)
  formData.append('categoryId', newProduct.categoryId)
  formData.append('description', newProduct.description)

  return <AdminSidebar />
}

export default Admin
