'use client'

import React, { useState } from 'react'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import { createBrand } from '@/http/Admin/brands'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { createCategory } from '@/http/Admin/categories'
import MessageString from '@/components/UI/MessageString/MessageString'

const BrandCreateForm = () => {
  const { newBrand, reset, setNewBrand } = useAdminStore((state) => ({
    newBrand: state.newBrand,
    setNewBrand: state.setNewBrand,
    reset: state.reset
  }))

  const [message, setMessage] = useState(null)

  const create = (e) => {
    e.preventDefault()
    createBrand(newBrand).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  return (
    <div>
      <h1>CREATE NEW BRAND</h1>
      <form onSubmit={create}>
        <Input
          label={'Input brand'}
          value={newBrand.name}
          onChange={(e) => {
            setNewBrand({ ...newBrand, name: e.target.value })
            setMessage(null)
          }}
        />
        {message && <MessageString message={message} />}
        <Button disabled={newBrand.name === ''}>Create brand</Button>
      </form>
    </div>
  )
}

export default BrandCreateForm
