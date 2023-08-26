'use client'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const CategoryDeleteForm = ({ state, setState, initialState }) => {
  const [select, setSelect] = useState({})

  const deleteC = (e) => {
    e.preventDefault()
    deleteCategory(state.newCategory.categoryId).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
        setSelect({})
      } else alert(r.message)
    })
  }

  return (
    <div>
      <h1>DELETE CATEGORY</h1>
      <form onSubmit={deleteC}>
        <ReactSelect
          value={select}
          label={'Choose category'}
          options={state.categoriesList}
          onChange={(option) => {
            setSelect(option)
            setState({
              ...state,
              newCategory: { ...state.newCategory, categoryId: option.value }
            })
          }}
        />
        <Button disabled={state.newCategory.categoryId === ''}>
          Delete category
        </Button>
      </form>
    </div>
  )
}

export default CategoryDeleteForm
