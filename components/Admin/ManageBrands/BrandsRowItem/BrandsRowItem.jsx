import React, { useState } from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import Link from 'next/link'
import { FiCheck, FiCornerDownLeft, FiTrash } from 'react-icons/fi'
import AdminEditInput from '@/components/UI/AdminInputs/AdminEditInput/AdminEditInput'
import { useQueryStore } from '@/store/mainStore/store'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { deleteBrand, updateBrand } from '@/http/Admin/brands'
import MessageString from '@/components/UI/MessageString/MessageString'

const BrandsRowItem = ({ item, selectedBrand, setSelectedBrand }) => {
  const { query, setQuery } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  const { productsList, fetchBrandsList } = useAdminListsStore((state) => ({
    productsList: state.productsList,
    fetchBrandsList: state.fetchBrandsList
  }))

  const { newBrand, reset, setNewBrand } = useAdminStore((state) => ({
    newBrand: state.newBrand,
    setNewBrand: state.setNewBrand,
    reset: state.reset
  }))

  const [message, setMessage] = useState(null)

  const updateHandler = async (id, name) => {
    await updateBrand(id, name).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && (await fetchBrandsList().then())
    })
  }

  const deleteBrandByIdHandler = async (id) => {
    await deleteBrand(id).then(async (r) => {
      !r.ok && setMessage(r)
      r.ok && reset()
      r.ok && (await fetchBrandsList().then())
    })
  }

  return (
    <div className={classes.categoriesBrandslistRow}>
      <Link
        href={'/store'}
        onClick={() => {
          setQuery({ ...query, brandId: item.value })
        }}
      >
        <FiCornerDownLeft className={classes.linkIco} />
      </Link>
      <AdminEditInput
        onFocus={() => {
          setMessage(null)
          setSelectedBrand(item.value)
          setNewBrand({ ...newBrand, name: item.label })
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
            updateHandler(item.value, newBrand.name).then(() =>
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
          item.value === selectedBrand
            ? newBrand.name
            : `${item.label} (${productsList.reduce((acc, product) => {
                if (product.value.brandId === item.value) acc++
                return acc
              }, 0)})`
        }
        placeholder={'Edit...'}
        onClick={(event) => {
          event.stopPropagation()
        }}
      ></AdminEditInput>

      <div className={classes.icoBlock}>
        <MessageString message={message} setMessage={setMessage} />
        {selectedBrand === item.value && (
          <FiCheck
            className={classes.submitIco}
            onMouseDown={(event) => {
              event.stopPropagation()
              updateHandler(item.value, newBrand.name).then()
              setSelectedBrand(null)
            }}
          />
        )}
        <FiTrash
          className={classes.removeIco}
          onClick={(event) => {
            event.stopPropagation()
            deleteBrandByIdHandler(item.value).then()
          }}
        />
      </div>
    </div>
  )
}

export default BrandsRowItem
