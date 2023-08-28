'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../../FormsStyles.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { updateCategory as updateCat } from '@/http/Admin/categories'
import MessageString from '@/components/UI/MessageString/MessageString'
import { fetchAllCategories } from '@/http/fetchers/fetchers'

const CategoryUpdateForm = () => {
  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    newCategory,
    setNewCategory,
    categoriesList,
    setCategoriesList,
    reset
  } = useAdminStore((state) => ({
    categoriesList: state.categoriesList,
    setCategoriesList: state.setCategoriesList,
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  useEffect(() => {
    fetchAllCategories().then((r) => {
      setCategoriesList(r.dataObject.categories)
      setIsLoaded(true)
    })
  }, [])

  const updateCategory = (e) => {
    e.preventDefault()
    updateCat(newCategory.categoryId.value, newCategory.name).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  return isLoaded ? (
    <div className={classes.form}>
      <h1>UPDATE CATEGORY</h1>
      <form onSubmit={updateCategory}>
        <ReactSelect
          label={'Select category'}
          options={categoriesList}
          value={newCategory.categoryId}
          onChange={(option) => {
            setNewCategory({ ...newCategory, categoryId: option })
          }}
        />
        <Input
          label={'Input new category name'}
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        {message && <MessageString message={message} />}
        <Button
          disabled={newCategory.name === '' || newCategory.categoryId === ''}
        >
          Update category
        </Button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default CategoryUpdateForm
