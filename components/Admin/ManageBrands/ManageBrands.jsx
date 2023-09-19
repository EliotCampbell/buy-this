'use client'

import React, { useState } from 'react'
import { createBrand } from '@/http/Admin/brands'
import { useAdminStore } from '@/store/adminStore/adminStore'
import MessageString from '@/components/UI/MessageString/MessageString'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'
import AdminInput from '@/components/UI/Admin/AdminInput/AdminInput'
import { FiPlus } from 'react-icons/fi'
import BrandsRowItem from '@/components/Admin/ManageBrands/BrandsRowItem/BrandsRowItem'

const ManageBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [message, setMessage] = useState(null)

  const { brandsList, fetchBrandsList } = useAdminListsStore((state) => ({
    brandsList: state.brandsList,
    fetchBrandsList: state.fetchBrandsList
  }))

  const { newBrand, reset, setNewBrand } = useAdminStore((state) => ({
    newBrand: state.newBrand,
    setNewBrand: state.setNewBrand,
    reset: state.reset
  }))

  const createHandler = async (brand) => {
    await createBrand(brand).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && (await fetchBrandsList().then())
    })
  }

  return (
    <>
      <h1>MANAGE BRANDS</h1>
      <div className={classes.formWithSidePreview}>
        <div className={classes.form}>
          <AdminInput
            placeholder={'Add brand...'}
            value={!selectedBrand ? newBrand.name : ''}
            onChange={(e) => {
              setNewBrand({ ...newBrand, name: e.target.value })
              setMessage(null)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                createHandler(newBrand).then()
              }
            }}
          >
            <div className={classes.icoBlock}>
              <MessageString message={message} setMessage={setMessage} />
              <FiPlus
                className={classes.submitIco}
                onClick={() => {
                  createHandler(newBrand).then()
                }}
              />
            </div>
          </AdminInput>

          {brandsList.length > 0 ? (
            brandsList.map((el) => {
              return (
                <BrandsRowItem
                  key={el.value}
                  item={el}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                />
              )
            })
          ) : (
            <p className={classes.placeholder}>No brands</p>
          )}
        </div>
      </div>
    </>
  )
}

export default ManageBrands
