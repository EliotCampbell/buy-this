'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { fetchAllBrands } from '@/http/fetchers/fetchers'
import { updateBrand as updateBra } from '@/http/Admin/brands'
import MessageString from '@/components/UI/MessageString/MessageString'

const BrandUpdateForm = () => {
  const [message, setMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { newBrand, setNewBrand, brandsList, setBrandsList, reset } =
    useAdminStore((state) => ({
      brandsList: state.brandsList,
      setBrandsList: state.setBrandsList,
      newBrand: state.newBrand,
      setNewBrand: state.setNewBrand,
      reset: state.reset
    }))

  useEffect(() => {
    fetchAllBrands().then((r) => {
      setBrandsList(r.dataObject.brands)
      setIsLoaded(true)
    })
  }, [])

  const updateBrand = (e) => {
    e.preventDefault()
    updateBra(newBrand.brandId.value, newBrand.name).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  return isLoaded ? (
    <div>
      <h1>UPDATE BRAND</h1>
      <form onSubmit={updateBrand}>
        <ReactSelect
          value={newBrand.brandId}
          label={'Choose brand'}
          options={brandsList}
          onChange={(option) => {
            setNewBrand({ ...newBrand, brandId: option })
          }}
        ></ReactSelect>
        <Input
          label={'Input brand'}
          value={newBrand.name}
          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
        />
        {message && <MessageString message={message} />}
        <Button disabled={newBrand.name === '' || newBrand.brandId === ''}>
          Update brand
        </Button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default BrandUpdateForm
