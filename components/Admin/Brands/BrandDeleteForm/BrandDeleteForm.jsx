'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { fetchAllBrands } from '@/http/fetchers/fetchers'
import { deleteBrand as deleteBra } from '@/http/Admin/brands'
import MessageString from '@/components/UI/MessageString/MessageString'

const BrandDeleteForm = () => {
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

  const deleteBrand = (e) => {
    e.preventDefault()
    deleteBra(newBrand.brandId.value).then((r) => {
      setMessage(r)
      r.ok && reset()
      fetchAllBrands().then((r) => {
        setBrandsList(r.dataObject.brands)
      })
    })
  }

  return isLoaded ? (
    <div>
      <h1>DELETE BRAND</h1>
      <form onSubmit={deleteBrand}>
        <ReactSelect
          value={newBrand.brandId}
          label={'Choose brand'}
          options={brandsList}
          onChange={(option) => {
            setNewBrand({ ...newBrand, brandId: option })
            setMessage(null)
          }}
        ></ReactSelect>
        {message && <MessageString message={message} />}
        <Button disabled={newBrand.brandId === ''}>Delete brand</Button>
      </form>
    </div>
  ) : (
    <h1>Loading...</h1>
  )
}

export default BrandDeleteForm
