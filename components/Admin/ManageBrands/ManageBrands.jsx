'use client'

import React, { useState } from 'react'
import { createBrand } from '@/http/Admin/brands'
import { useAdminStore } from '@/store/adminStore/adminStore'
import MessageString from '@/components/UI/MessageString/MessageString'

import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'
import AdminNewInput from '@/components/UI/Admin/AdminNewInput/AdminNewInput'
import { FiPlus } from 'react-icons/fi'

import BrandsRowItem from '@/components/Admin/ManageBrands/BrandsRowItem/BrandsRowItem'
import { useUserStore } from '@/store/mainStore/store'

const ManageBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null)

  const { message, setMessage } = useUserStore((state) => ({
    message: state.message,
    setMessage: state.setMessage
  }))

  const { brandsList, fetchBrandsList } = useAdminListsStore((state) => ({
    brandsList: state.brandsList,
    fetchBrandsList: state.fetchBrandsList
  }))

  const { newBrand, reset, setNewBrand } = useAdminStore((state) => ({
    newBrand: state.newBrand,
    setNewBrand: state.setNewBrand,
    reset: state.reset
  }))

  const create = async () => {
    await createBrand(newBrand).then(async (r) => {
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
          <AdminNewInput
            placeholder={'Add brand...'}
            value={!selectedBrand ? newBrand.name : ''}
            onChange={(e) => {
              setNewBrand({ ...newBrand, name: e.target.value })
              setMessage(null)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                create().then()
              }
            }}
          >
            <div className={classes.icoBlock}>
              <FiPlus
                className={classes.submitIco}
                onClick={() => {
                  create().then()
                }}
              />
            </div>
          </AdminNewInput>

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
      {message && <MessageString message={message} />}
    </>
  )
}

export default ManageBrands
