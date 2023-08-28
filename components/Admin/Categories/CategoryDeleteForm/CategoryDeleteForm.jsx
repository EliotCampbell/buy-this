'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { deleteCategory as deleteCat } from '@/http/Admin/categories'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { fetchAllCategories } from '@/http/fetchers/fetchers'
import MessageString from '@/components/UI/MessageString/MessageString'

const CategoryDeleteForm = () => {
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

  const deleteCategory = (e) => {
    e.preventDefault()
    deleteCat(newCategory.categoryId.value).then((r) => {
      setMessage(r)
      r.ok && reset()
      fetchAllCategories().then((r) => {
        setCategoriesList(r.dataObject.categories)
      })
    })
  }

  return isLoaded ? (
    <div>
      <h1>DELETE CATEGORY</h1>
      <form onSubmit={deleteCategory}>
        <ReactSelect
          value={newCategory.categoryId}
          label={'Choose category'}
          options={categoriesList}
          onChange={(option) => {
            setNewCategory({ ...newCategory, categoryId: option })
            setMessage(null)
          }}
        />
        {message && <MessageString message={message} />}
        <Button disabled={newCategory.categoryId === ''}>
          Delete category
        </Button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default CategoryDeleteForm
