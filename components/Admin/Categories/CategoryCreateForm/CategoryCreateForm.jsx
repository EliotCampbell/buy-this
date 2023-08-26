'use client'
import React from 'react'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import { useAdminStore } from '@/app/admin/adminStore/adminStore'

const CategoryCreateForm = () => {
  const { newCategory, reset, setNewCategory } = useAdminStore((state) => ({
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  const create = (e) => {
    e.preventDefault()
    createCategory(newCategory).then((r) => {
      if (r.ok) {
        reset()
      } else alert('Failed')
    })
  }

  return (
    <div>
      <h1>CREATE NEW CATEGORY</h1>
      <form onSubmit={create}>
        <Input
          value={newCategory.name}
          label={'Input category:'}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <Button disabled={newCategory.name === ''}>Create category</Button>
      </form>
    </div>
  )
}

export default CategoryCreateForm
