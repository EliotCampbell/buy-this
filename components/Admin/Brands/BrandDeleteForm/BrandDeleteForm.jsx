'use client'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const BrandDeleteForm = ({ state, setState, initialState }) => {
  const [select, setSelect] = useState({})

  const deleteB = (e) => {
    e.preventDefault()
    deleteBrand(state.newBrand.brandId).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
        setSelect({})
      } else alert(r.message)
    })
  }

  return (
    <div>
      <h1>DELETE BRAND</h1>
      <form onSubmit={deleteB}>
        <ReactSelect
          value={select}
          label={'Choose brand name'}
          options={state.brandsList}
          onChange={(option) => {
            setSelect(option)
            setState({
              ...state,
              newBrand: { ...state.newBrand, brandId: option.value }
            })
          }}
        ></ReactSelect>
        <Button disabled={state.newBrand.brandId === ''}>Delete brand</Button>
      </form>
    </div>
  )
}

export default BrandDeleteForm
