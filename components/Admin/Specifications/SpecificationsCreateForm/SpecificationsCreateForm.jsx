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

const SpecificationsCreateForm = () => {
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
    setPreview,
    newSpecification,
    setNewSpecification
  } = useAdminStore((state) => ({
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
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
    fetchAllProducts().then((r) => {
      setProductsList(r.dataObject.products.rows)
      setIsLoaded(true)
    })
  }, [])

  const create = (e) => {
    e.preventDefault()
    const specification = {
      title: newSpecification.title,
      description: newSpecification.description,
      productId: newSpecification.productId
    }
    createSpecificationByPId(specification).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
      } else {
        alert('Failed')
      }
    })
  }

  return (
    <div className={classes.specifications}>
      <div>
        <h1 className={classes.header}>CREATE NEW SPECIFICATION</h1>

        <form onSubmit={create}>
          <ReactSelect
            label={'Select product'}
            options={productsList}
            onChange={(option) => {
              setNewSpecification({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  productId: option.value.id
                }
              })
            }}
          ></ReactSelect>
          <Input
            label={'title'}
            value={newSpecification.title}
            onChange={(e) =>
              setState({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  title: e.target.value
                }
              })
            }
          />
          <Input
            label={'description'}
            value={newSpecification.description}
            onChange={(e) =>
              setState({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  description: e.target.value
                }
              })
            }
          />
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
  )
}

export default SpecificationsCreateForm
