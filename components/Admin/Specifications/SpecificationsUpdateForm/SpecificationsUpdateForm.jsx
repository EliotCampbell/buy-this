'use client'
import React, { useEffect, useState } from 'react'
import classes from '../SpecificationsForm.module.css'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { fetchAllProducts, fetchProductById } from '@/http/fetchers/fetchers'
import MessageString from '@/components/UI/MessageString/MessageString'
import { updateSpecificationById } from '@/http/Admin/specifications'

const SpecificationsUpdateForm = () => {
  const {
    reset,
    productsList,
    setProductsList,
    newSpecification,
    setNewSpecification,
    setSpecificationsList,
    specificationsList
  } = useAdminStore((state) => ({
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
    productsList: state.productsList,
    setProductsList: state.setProductsList,
    reset: state.reset,
    setSpecificationsList: state.setSpecificationsList,
    specificationsList: state.specificationsList
  }))

  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchAllProducts().then((r) => {
      setProductsList(r.dataObject.products.rows)
      setIsLoaded(true)
    })
  }, [])

  const updateSpecification = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('title', newSpecification.title)
    formData.append('description', newSpecification.description)
    updateSpecificationById(newSpecification.specificationId, formData).then(
      (r) => {
        setMessage(r)
        r.ok && reset()
      }
    )
  }

  return isLoaded ? (
    <div className={classes.specifications}>
      <div>
        <h1 className={classes.header}>UPDATE SPECIFICATION</h1>
        <ReactSelect
          label={'Select product'}
          options={productsList}
          onChange={(option) => {
            setNewSpecification({
              ...newSpecification,
              productId: option.value.id
            })
            fetchProductById(option.value.id).then((r) => {
              setSpecificationsList(r.dataObject.product.info)
            })
          }}
        ></ReactSelect>
        <form onSubmit={updateSpecification}>
          <ReactSelect
            label={'Select specification'}
            options={specificationsList}
            onChange={(option) => {
              setNewSpecification({
                ...newSpecification,
                specificationId: option.value.id
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
          <Button>Update specification</Button>
        </form>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default SpecificationsUpdateForm
