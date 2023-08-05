import React, { useContext, useRef, useState } from 'react'
import { updateProduct } from '../../../../http/productsAPI'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import { observer } from 'mobx-react-lite'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import ProductPreviewCard from '../../../Shop/ProductPreviewCard/ProductPreviewCard'
import { Context } from '../../../../index'

const ProductUpdateForm = observer(
  ({ state, setState, formData, initialState }) => {
    const { products } = useContext(Context)
    const inputRef = useRef()

    const initialSelect = { category: {}, brand: {} }

    const [select, setSelect] = useState(initialSelect)

    const update = (e) => {
      e.preventDefault()
      updateProduct(state.oldProductId, formData).then((r) => {
        if (r.ok) {
          inputRef.current.value = ''
          setState({ ...initialState, message: r.message })
          setSelect(initialSelect)
          alert(r.message)
        } else alert('fault')
      })
    }

    return (
      <div>
        <h1>UPDATE PRODUCT</h1>
        <div className={classes.formWrapper}>
          <form onSubmit={update} className={classes.form}>
            <ReactSelect
              label={'Select product'}
              options={state.productsList}
              onChange={(option) => {
                setSelect({
                  ...select,
                  category: {
                    label: products.categories.find(
                      (el) =>
                        el.id.toString() === option.value.categoryId.toString()
                    ).name,
                    value: option.value.categoryId
                  },
                  brand: {
                    label: products.brands.find(
                      (el) =>
                        el.id.toString() === option.value.brandId.toString()
                    ).name,
                    value: option.value.brandId
                  }
                })
                setState({
                  ...state,
                  newProduct: {
                    brandId: option.value.brandId.toString(),
                    categoryId: option.value.categoryId,
                    name: option.value.name,
                    price: option.value.price,
                    description: option.value.description,
                    file: option.value.img
                  },
                  oldProductId: option.value.id
                })
              }}
            ></ReactSelect>
            <ReactSelect
              value={select.brand}
              label={'Choose brand name'}
              options={state.brandsList}
              onChange={(option) => {
                setSelect({ ...select, brand: { ...option } })
                setState({
                  ...state,
                  newProduct: { ...state.newProduct, brandId: option.value }
                })
              }}
            ></ReactSelect>
            <ReactSelect
              value={select.category}
              label={'Choose category'}
              options={state.categoriesList}
              onChange={(option) => {
                setSelect({ ...select, category: { ...option } })
                setState({
                  ...state,
                  newProduct: { ...state.newProduct, categoryId: option.value }
                })
              }}
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
              placeholder={'47,99'}
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
            <Button disabled={!state.isValid}>Update product</Button>
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
)

export default ProductUpdateForm
