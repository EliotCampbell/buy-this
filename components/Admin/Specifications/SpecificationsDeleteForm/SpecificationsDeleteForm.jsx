'use client'
import classes from '../SpecificationsForm.module.css'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import Specifications from '../../../Shop/ProductDetails/Specifications/Specifications'
import { useAdminStore } from '@/store/adminStore/adminStore'
import React, { useEffect, useState } from 'react'
import { fetchAllProducts, fetchProductById } from '@/http/fetchers/fetchers'
import { deleteSpecificationById } from '@/http/Admin/specifications'
import { useProductStore } from '@/store/mainStore/store'
import MessageString from '@/components/UI/MessageString/MessageString'

const SpecificationsDeleteForm = () => {
  const { specifications, setSpecifications } = useProductStore((state) => ({
    specifications: state.specifications,
    setSpecifications: state.setSpecifications
  }))
  const {
    reset,
    productsList,
    setProductsList,
    newSpecification,
    setNewSpecification
  } = useAdminStore((state) => ({
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
    productsList: state.productsList,
    setProductsList: state.setProductsList,
    reset: state.reset
  }))

  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchAllProducts().then((r) => {
      setProductsList(r.dataObject.products.rows)
      setIsLoaded(true)
    })
  }, [])

  const deleteSpecification = (id) => {
    deleteSpecificationById(id).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  return isLoaded ? (
    <div className={classes.specifications}>
      <div>
        <h1 className={classes.header}>DELETE SPECIFICATION</h1>

        <ReactSelect
          label={'Select product'}
          options={productsList}
          onChange={(option) => {
            setNewSpecification({
              ...newSpecification,
              productId: option.value.id
            })
            fetchProductById(option.value.id).then((r) => {
              setSpecifications(r.dataObject.product.info)
            })
          }}
        ></ReactSelect>
        <h1 className={classes.tableTitle}>Specifications:</h1>

        <Specifications
          deleteSpecification={deleteSpecification}
          specifications={specifications}
        />
        {message && <MessageString message={message} />}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default SpecificationsDeleteForm
