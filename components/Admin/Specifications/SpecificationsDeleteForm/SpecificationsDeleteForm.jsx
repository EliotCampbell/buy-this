'use client'
import classes from '../SpecificationsForm.module.css'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import Specifications from '../../../Shop/ProductDetails/Specifications/Specifications'
import { useAdminStore } from '@/store/adminStore/adminStore'
import React, { useEffect, useState } from 'react'
import { fetchAllProducts, fetchProductById } from '@/http/fetchers/fetchers'
import { deleteSpecificationById } from '@/http/Admin/specifications'
import { useProductStore } from '@/store/mainStore/store'
import MessageString from '@/components/UI/MessageString/MessageString'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const SpecificationsDeleteForm = () => {
  const { productsList, fetchProductsList } = useAdminListsStore((state) => ({
    productsList: state.productsList,
    fetchProductsList: state.fetchProductsList
  }))

  const { reset, newSpecification, setNewSpecification } = useAdminStore(
    (state) => ({
      setNewSpecification: state.setNewSpecification,
      newSpecification: state.newSpecification,
      reset: state.reset
    })
  )

  const [message, setMessage] = useState(null)

  const deleteSpecification = (id) => {
    deleteSpecificationById(id).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
  }

  return (
    <div className={classes.specifications}>
      <div>
        <h1 className={classes.header}>MANAGE SPECIFICATIONS</h1>

        <ReactSelect
          label={'Select product'}
          options={productsList}
          onChange={(option) => {
            setNewSpecification({
              ...newSpecification,
              productId: option.value.id
            })
          }}
        ></ReactSelect>
        <h1 className={classes.tableTitle}>Specifications:</h1>

        <Specifications
          deleteSpecification={deleteSpecification}
          specifications={''}
        />
        {message && <MessageString message={message} />}
      </div>
    </div>
  )
}

export default SpecificationsDeleteForm
