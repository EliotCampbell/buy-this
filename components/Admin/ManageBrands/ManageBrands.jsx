'use client'

import React, { useState } from 'react'
import { createBrand, deleteBrand, updateBrand } from '@/http/Admin/brands'
import { useAdminStore } from '@/store/adminStore/adminStore'
import MessageString from '@/components/UI/MessageString/MessageString'
import { useQueryStore } from '@/store/mainStore/store'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'
import AdminNewInput from '@/components/UI/Admin/AdminNewInput/AdminNewInput'
import { FiCheck, FiCornerDownLeft, FiPlus, FiTrash } from 'react-icons/fi'
import Link from 'next/link'
import AdminEditInput from '@/components/UI/Admin/AdminEditInput/AdminEditInput'

const ManageBrands = () => {
  const [message, setMessage] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)

  const { query, setQuery } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  const { brandsList, productsList, fetchBrandsList } = useAdminListsStore(
    (state) => ({
      brandsList: state.brandsList,
      productsList: state.productsList,
      fetchBrandsList: state.fetchBrandsList
    })
  )

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

  const update = async (id, name) => {
    await updateBrand(id, name).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && (await fetchBrandsList().then())
    })
  }

  const deleteBrandById = async (id) => {
    await deleteBrand(id).then(async (r) => {
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

          {brandsList.map((el) => (
            <div className={classes.categoriesBrandslistRow} key={el.value}>
              <Link
                href={'/store'}
                onClick={() => {
                  setQuery({ ...query, brandId: el.value })
                }}
              >
                <FiCornerDownLeft className={classes.linkIco} />
              </Link>
              <AdminEditInput
                onFocus={() => {
                  setMessage(null)
                  setSelectedBrand(el.value)
                  setNewBrand({ ...newBrand, name: el.label })
                }}
                onChange={(event) => {
                  setMessage(null)
                  setNewBrand({
                    ...newBrand,
                    name: event.target.value
                  })
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    update(el.value, newBrand.name).then(() =>
                      setSelectedBrand(null)
                    )
                    event.target.blur()
                  }
                  if (event.key === 'Escape') {
                    setNewBrand({ ...newBrand, name: '' })
                    setSelectedBrand(null)
                  }
                }}
                onBlur={() => {
                  setNewBrand({ ...newBrand, name: '' })
                  setSelectedBrand(null)
                }}
                value={
                  el.value === selectedBrand
                    ? newBrand.name
                    : `${el.label} (${productsList.reduce((acc, product) => {
                        if (product.value.brandId === el.value) acc++
                        return acc
                      }, 0)})`
                }
                placeholder={'Edit...'}
                onClick={(event) => {
                  event.stopPropagation()
                }}
              ></AdminEditInput>

              <div className={classes.icoBlock}>
                {selectedBrand === el.value && (
                  <FiCheck
                    className={classes.submitIco}
                    onMouseDown={(event) => {
                      event.stopPropagation()
                      update(el.value, newBrand.name).then()
                      setSelectedBrand(null)
                    }}
                  />
                )}
                <FiTrash
                  className={classes.removeIco}
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteBrandById(el.value).then()
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {message && <MessageString message={message} />}
    </>
  )
}

export default ManageBrands
