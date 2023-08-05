import React from 'react'
import Button from '../../../UI/Button/Button'
import { createCategory } from '../../../../http/productsAPI'
import Input from '../../../UI/Input/Input'

const CategoryCreateForm = ({ state, setState, initialState }) => {
  const create = (e) => {
    e.preventDefault()
    createCategory(state.newCategory).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
      } else alert('Failed')
    })
  }

  return (
    <div>
      <h1>CREATE NEW CATEGORY</h1>
      <form onSubmit={create}>
        <Input
          value={state.newCategory.name}
          label={'Input category:'}
          onChange={(e) =>
            setState({
              ...state,
              newCategory: { ...state.newCategory, name: e.target.value }
            })
          }
        />
        <Button disabled={state.newCategory.name === ''}>
          Create category
        </Button>
      </form>
    </div>
  )
}

export default CategoryCreateForm
