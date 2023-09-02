'use client'
import React, { useState } from 'react'
import Button from '@/components/UI/Button/Button'
import Input from '@/components/UI/Input/Input'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { createCategory } from '@/http/Admin/categories'
import MessageString from '@/components/UI/MessageString/MessageString'
import classes from '@/components/Admin/FormsStyles.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const CategoryCreateForm = () => {
  const { newCategory, reset, setNewCategory } = useAdminStore((state) => ({
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  const { fetchCategoriesList } = useAdminListsStore((state) => ({
    fetchCategoriesList: state.fetchCategoriesList
  }))

  const [message, setMessage] = useState(null)

  const create = async (e) => {
    e.preventDefault()
    await createCategory(newCategory).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchCategoriesList().then()
  }

  return (
    <div className={classes.formDiv}>
      <h1>CREATE NEW CATEGORY</h1>
      <form onSubmit={create} className={classes.form}>
        <Input
          value={newCategory.name}
          label={'Input category:'}
          placeholder={'New category'}
          onChange={(e) => {
            setNewCategory({ ...newCategory, name: e.target.value })
            setMessage(null)
          }}
        />
        {message && <MessageString message={message} />}
        <Button disabled={newCategory.name === ''}>Create category</Button>
      </form>
    </div>
  )
}

export default CategoryCreateForm
