import React, { useEffect, useState } from 'react'
import classes from './Admin.module.css'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { useLocation } from 'react-router-dom'
import { linksArr } from '../../../AdminMenuRoutes'
import {
  fetchBrands,
  fetchCategories,
  fetchProducts,
  fetchSpecificationsByPId
} from '../../../http/productsAPI'

const Admin = () => {
  const location = useLocation()

  const initialState = {
    productsList: products.products.map((el) => ({
      value: el,
      label: el.name
    })),
    categoriesList: products.categories.map((el) => ({
      value: el.id,
      label: el.name
    })),
    brandsList: products.brands.map((el) => ({
      value: el.id,
      label: el.name
    })),
    specificationsList: products.specifications.map((el) => ({
      value: el.id,
      label: el.title
    })),
    isValid: true,
    oldProductId: '',
    newBrand: { name: '', brandId: '' },
    newCategory: { name: '', categoryId: '' },
    newSpecification: {
      title: '',
      description: '',
      productId: '',
      specificationId: ''
    },
    newProduct: {
      brandId: '',
      categoryId: '',
      name: '',
      price: '',
      description: '',
      file: ''
    },
    preview: process.env.REACT_APP_API_URL + 'noImg.jpg',
    message: null
  }

  const [state, setState] = useState({ ...initialState })

  //validator

  useEffect(() => {
    state.newProduct.brandId === '' ||
    state.newProduct.categoryId === '' ||
    state.newProduct.name === '' ||
    state.newProduct.price === '' ||
    state.newProduct.description === ''
      ? setState({ ...state, isValid: false })
      : setState({ ...state, isValid: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.newProduct])

  //previewer

  useEffect(() => {
    if (state.newProduct.file === '') {
      return setState({
        ...state,
        preview: process.env.REACT_APP_API_URL + 'noImg.jpg'
      })
    }
    state.newProduct.file.name
      ? setState({
          ...state,
          preview: URL.createObjectURL(state.newProduct.file)
        })
      : setState({
          ...state,
          preview: process.env.REACT_APP_API_URL + state.newProduct.file
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.newProduct.file])

  //show message and refetch

  useEffect(() => {
    if (state.message) {
      // Fetch categories, brands, and products
      Promise.all([
        fetchCategories(),
        fetchBrands(),
        fetchProducts({ query: '?limit=8' })
      ])
        .then(([categoryData, brandData, productData]) => {
          products.setCategories(categoryData.dataObject.categories)
          products.setBrands(brandData.dataObject.brands)
          products.setProductsCount(productData.dataObject.products.count)
          products.setProducts(productData.dataObject.products.rows)

          // Update the state with the fetched data
          setState((prevState) => ({
            ...prevState,
            productsList: productData.dataObject.products.rows.map((el) => ({
              value: el,
              label: el.name
            })),
            categoriesList: categoryData.dataObject.categories.map((el) => ({
              value: el.id,
              label: el.name
            })),
            brandsList: brandData.dataObject.brands.map((el) => ({
              value: el.id,
              label: el.name
            }))
          }))
          // Set a timeout to clear the message after 5000ms (5 seconds)
          setTimeout(() => {
            setState((prevState) => ({
              ...prevState,
              message: null
            }))
          }, 5000)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [state.message])

  //specifications fetcher

  useEffect(() => {
    if (state.newSpecification.productId !== '') {
      fetchSpecificationsByPId(state.newSpecification.productId).then(
        (data) => {
          setState((prevState) => ({
            ...prevState,
            specificationsList: data.dataObject.productSpecifications.map(
              (el) => ({
                value: el.id,
                label: el.title
              })
            )
          }))
          products.setSpecifications(data.dataObject.productSpecifications)
        }
      )
    }
  }, [state.newSpecification.productId])

  //all products fetcher on first loading

  useEffect(() => {
    fetchProducts({}).then((data) => {
      products.setProductsCount(data.dataObject.products.count)
      products.setProducts(data.dataObject.products.rows)

      // Update the state with the fetched products data
      setState((prevState) => ({
        ...prevState,
        productsList: data.dataObject.products.rows.map((el) => ({
          value: el,
          label: el.name
        }))
      }))
    })
  }, [])

  const formData = new FormData()
  formData.append('name', state.newProduct.name)
  formData.append('price', state.newProduct.price.toString())
  formData.append('img', state.newProduct.file)
  formData.append('brandId', state.newProduct.brandId)
  formData.append('categoryId', state.newProduct.categoryId)
  formData.append('description', state.newProduct.description)

  const props = {
    state,
    setState,
    formData,
    initialState
  }

  return (
    <div>
      {state.message && (
        <div className={classes.messageDiv}>
          <p className={classes.message}>{state.message}</p>
        </div>
      )}
      <div className={classes.admin}>
        <></>
        <AdminSidebar linksArr={linksArr} />
        <div className={classes.inputs}>
          {location.pathname === '/admin' && <h1>Choose anything</h1>}
          {linksArr(props).map((el) => {
            if (el.title) return undefined
            return (
              <div key={el.path}>
                {location.pathname === el.path && el.page}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Admin
