import React from 'react'
import Button from '../../../UI/Button/Button'
import { updateCategory } from '../../../../http/productsAPI'
import classes from '../../FormsStyles.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const CategoryUpdateForm = ({ state, setState, initialState }) => {
  const update = (e) => {
    e.preventDefault()
    updateCategory(state.newCategory.categoryId.value, {
      name: state.newCategory.name
    }).then((r) => {
      if (r.ok) {
        setState({ ...initialState, message: r.message })
      } else alert('Failed')
    })
  }

  return (
    <div className={classes.form}>
      <h1>UPDATE CATEGORY</h1>
      <form onSubmit={update}>
        <ReactSelect
          label={'Select category'}
          options={state.categoriesList}
          value={state.newCategory.categoryId}
          onChange={(option) => {
            setState({
              ...state,
              newCategory: { ...state.newCategory, categoryId: option }
            })
          }}
        />
        <Input
          label={'Input new category name'}
          value={state.newCategory.name}
          onChange={(e) =>
            setState({
              ...state,
              newCategory: { ...state.newCategory, name: e.target.value }
            })
          }
        />
        <Button
          disabled={
            state.newCategory.name === '' || state.newCategory.categoryId === ''
          }
        >
          Update category
        </Button>
      </form>
    </div>
  )
}

export default CategoryUpdateForm
