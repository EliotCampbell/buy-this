'use client'
import React from 'react'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'

import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const BrandUpdateForm = ({ state, setState, initialState }) => {
  const update = (e) => {
    e.preventDefault()
    updateBrand(state.newBrand.brandId, { name: state.newBrand.name }).then(
      (r) => {
        if (r.ok) {
          setState({ ...initialState, message: r.message })
        } else alert('Failed')
      }
    )
  }

  return (
    <div>
      <h1>UPDATE BRAND</h1>
      <form onSubmit={update}>
        <ReactSelect
          label={'Choose brand name'}
          options={state.brandsList}
          onChange={(option) => {
            setState({
              ...state,
              newBrand: { ...state.newBrand, brandId: option.value }
            })
          }}
        ></ReactSelect>
        <Input
          label={'Input brand'}
          value={state.newBrand.name}
          onChange={(e) =>
            setState({
              ...state,
              newBrand: { ...state.newBrand, name: e.target.value }
            })
          }
        />
        <Button
          disabled={state.newBrand.name === '' || state.newBrand.brandId === ''}
        >
          Update brand
        </Button>
      </form>
    </div>
  )
}

export default BrandUpdateForm
