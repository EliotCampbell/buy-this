'use client'

import React, { useRef } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'

const ProductCreateForm = ({ state, setState, initialState, formData }) => {
  const create = (e) => {
    e.preventDefault()
    createProduct(formData).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
        inputRef.current.value = ''
      } else alert('fault')
    })
  }

  const inputRef = useRef()

  return (
    <div className={classes.formDiv}>
      <h1>CREATE NEW PRODUCT</h1>
      <div className={classes.formWrapper}>
        <form onSubmit={create} className={classes.form}>
          <ReactSelect
            label={'Choose brand name'}
            options={state.brandsList}
            onChange={(option) => {
              setState({
                ...state,
                newProduct: { ...state.newProduct, brandId: option.value }
              })
            }}
          ></ReactSelect>
          <ReactSelect
            label={'Choose category'}
            options={state.categoriesList}
            onChange={(option) =>
              setState({
                ...state,
                newProduct: { ...state.newProduct, categoryId: option.value }
              })
            }
          ></ReactSelect>
          <Input
            placeholder={'Bicycle'}
            label={'Input product name'}
            value={state.newProduct.name}
            onChange={(e) => {
              setState({
                ...state,
                newProduct: { ...state.newProduct, name: e.target.value }
              })
            }}
          />
          <Input
            placeholder={'47'}
            label={'Input product price'}
            value={state.newProduct.price}
            type={'number'}
            onChange={(e) =>
              setState({
                ...state,
                newProduct: { ...state.newProduct, price: e.target.value }
              })
            }
          />
          <Input
            placeholder={'Many words about it'}
            label={'Input product description'}
            value={state.newProduct.description}
            onChange={(e) =>
              setState({
                ...state,
                newProduct: {
                  ...state.newProduct,
                  description: e.target.value
                }
              })
            }
          />
          <Input
            ref={inputRef}
            type={'file'}
            accept={'.png,.jpg'}
            onChange={(e) =>
              setState({
                ...state,
                newProduct: { ...state.newProduct, file: e.target.files[0] }
              })
            }
          />
          <Button disabled={!state.isValid}>Create product</Button>
        </form>

        <div className={classes.productsCardWrapper}>
          <p className={classes.preview}>Preview</p>
          <ProductPreviewCard
            productId={state.newProduct.id}
            brandId={state.newProduct.brandId}
            productName={
              state.newProduct.name === '' ? 'Name' : state.newProduct.name
            }
            productImg={state.preview}
            productPrice={state.newProduct.price}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCreateForm
