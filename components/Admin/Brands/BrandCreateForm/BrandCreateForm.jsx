'use client'

import React from 'react'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'

const BrandCreateForm = ({ setState, state, initialState }) => {
  const create = (e) => {
    e.preventDefault()
    createBrand(state.newBrand).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
      } else alert('Failed')
    })
  }

  return (
    <div>
      <h1>CREATE NEW BRAND</h1>
      <form onSubmit={create}>
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
        <Button disabled={state.newBrand.name === ''}>Create brand</Button>
      </form>
    </div>
  )
}

export default BrandCreateForm
