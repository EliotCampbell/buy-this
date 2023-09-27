'use client'
import React, { useState } from 'react'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'
import MessageString from '@/components/UI/MessageString/MessageString'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import CreateSpecification from '@/components/Admin/ManageSpecifications/CreateSpecification/CreateSpecification'
import SpecificationTable from '@/components/Admin/ManageSpecifications/SpecificationTable/SpecificationTable'

const ManageSpecifications = () => {
  const [message, setMessage] = useState(null)

  const { productsList, fetchSpecificationsList } = useAdminListsStore(
    (state) => ({
      productsList: state.productsList,
      fetchSpecificationsList: state.fetchSpecificationsList
    })
  )

  const { setSelectedProduct, selectedProduct } = useAdminStore((state) => ({
    selectedProduct: state.selectedProduct,
    setSelectedProduct: state.setSelectedProduct
  }))

  return (
    <>
      <h1>MANAGE SPECIFICATIONS</h1>
      <div className={classes.form}>
        <AdminReactSelect
          label={'Select product'}
          options={productsList}
          onChange={(option) => {
            setSelectedProduct(option.value.id)
            fetchSpecificationsList(option.value.id).then()
          }}
        ></AdminReactSelect>
        {selectedProduct && <CreateSpecification setMessage={setMessage} />}
        <SpecificationTable />
      </div>
      {message && <MessageString message={message} />}
    </>
  )
}

export default ManageSpecifications
