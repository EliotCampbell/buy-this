'use client'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { updateCategory as updateCat } from '@/http/Admin/categories'
import MessageString from '@/components/UI/MessageString/MessageString'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const CategoryUpdateForm = () => {
  const [message, setMessage] = useState(null)

  const { categoriesList, fetchCategoriesList } = useAdminListsStore(
    (state) => ({
      categoriesList: state.categoriesList,
      fetchCategoriesList: state.fetchCategoriesList
    })
  )

  const { newCategory, setNewCategory, reset } = useAdminStore((state) => ({
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  const updateCategory = async (e) => {
    e.preventDefault()
    await updateCat(newCategory.categoryId.value, newCategory.name).then(
      (r) => {
        setMessage(r)
        r.ok && reset()
      }
    )
    await fetchCategoriesList().then()
  }

  return (
    <div className={classes.formDiv}>
      <h1>UPDATE CATEGORY</h1>
      <form onSubmit={updateCategory} className={classes.form}>
        <ReactSelect
          instanceId
          label={'Select category'}
          options={categoriesList}
          value={newCategory.categoryId}
          onChange={(option) => {
            setNewCategory({ ...newCategory, categoryId: option })
            setMessage(null)
          }}
        />
        <Input
          label={'Input new category name'}
          value={newCategory.name}
          placeholder={'New category name'}
          onChange={(e) => {
            setNewCategory({ ...newCategory, name: e.target.value })
            setMessage(null)
          }}
        />
        {message && <MessageString message={message} />}
        <Button
          disabled={newCategory.name === '' || newCategory.categoryId === ''}
        >
          Update category
        </Button>
      </form>
    </div>
  )
}

export default CategoryUpdateForm
