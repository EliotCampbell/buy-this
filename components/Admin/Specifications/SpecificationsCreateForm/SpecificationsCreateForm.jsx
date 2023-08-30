'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../SpecificationsForm.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import {
  fetchAllBrands,
  fetchAllCategories,
  fetchAllProducts
} from '@/http/fetchers/fetchers'
import { createSpecificationByProductId } from '@/http/Admin/specifications'
import MessageString from '@/components/UI/MessageString/MessageString'

const SpecificationsCreateForm = () => {
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

  const createSpecification = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('title', newSpecification.title)
    formData.append('description', newSpecification.description)
    formData.append('productId', newSpecification.productId)
    createSpecificationByProductId(formData).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    fetchAllProducts().then((r) => {
      setProductsList(r.dataObject.products.rows)
    })
  }

  return isLoaded ? (
    <div className={classes.specifications}>
      <div>
        <h1 className={classes.header}>CREATE NEW SPECIFICATION</h1>

        <form onSubmit={createSpecification}>
          <ReactSelect
            label={'Select product'}
            options={productsList}
            onChange={(option) => {
              setNewSpecification({
                ...newSpecification,
                productId: option.value.id
              })
            }}
          ></ReactSelect>
          <Input
            label={'title'}
            value={newSpecification.title}
            onChange={(e) =>
              setNewSpecification({
                ...newSpecification,
                title: e.target.value
              })
            }
          />
          <Input
            label={'description'}
            value={newSpecification.description}
            onChange={(e) =>
              setNewSpecification({
                ...newSpecification,
                description: e.target.value
              })
            }
          />
          {message && <MessageString message={message} />}
          <Button
            disabled={
              newSpecification.productId === '' ||
              newSpecification.description === '' ||
              newSpecification.title === ''
            }
          >
            Create specification
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default SpecificationsCreateForm
