'use client'
import React from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'

import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const ProductEditForm = ({ state, setState, initialState }) => {
  const deleteP = (e) => {
    e.preventDefault()
    deleteProduct(state.oldProductId).then((r) => {
      if (r.ok) {
        setState({ ...initialState })
        alert(r.message)
      } else {
        alert(r.message)
      }
    })
  }

  return (
    <div className={classes.form}>
      <h1>DELETE PRODUCT</h1>
      <div>
        <form onSubmit={deleteP} className={classes.form}>
          <ReactSelect
            label={'Select product'}
            options={state.productsList}
            onChange={(option) => {
              setState({
                ...state,
                oldProductId: option.value.id
              })
            }}
          ></ReactSelect>
          <Button disabled={state.oldProductId === ''}>Delete product</Button>
        </form>
      </div>
    </div>
  )
}

export default ProductEditForm
