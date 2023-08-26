'use client'
import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { createCategory } from '@/http/Admin/categories'
import MessageString from '@/components/UI/MessageString/MessageString'

const CategoryCreateForm = () => {
  const { newCategory, reset, setNewCategory } = useAdminStore((state) => ({
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  const [message, setMessage] = useState(null)

  const create = (e) => {
    e.preventDefault()
    createCategory(newCategory).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  return (
    <div>
      <h1>CREATE NEW CATEGORY</h1>
      <form onSubmit={create}>
        <Input
          value={newCategory.name}
          label={'Input category:'}
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
