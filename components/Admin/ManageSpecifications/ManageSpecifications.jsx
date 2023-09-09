'use client'
import React from 'react'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from './ManageSpecifications.module.css'
import MessageString from '@/components/UI/MessageString/MessageString'
import AdminReactSelect from '@/components/UI/Admin/AdminReactSelect/AdminReactSelect'
import CreateSpecification from '@/components/Admin/ManageSpecifications/CreateSpecification/CreateSpecification'
import SpecificationTable from '@/components/Admin/ManageSpecifications/SpecificationTable/SpecificationTable'

const ManageSpecifications = () => {
  const { productsList, fetchSpecificationsList } = useAdminListsStore(
    (state) => ({
      productsList: state.productsList,
      fetchSpecificationsList: state.fetchSpecificationsList
    })
  )

  const { setSelectedProduct, selectedProduct, message } = useAdminStore(
    (state) => ({
      message: state.message,
      selectedProduct: state.selectedProduct,
      setSelectedProduct: state.setSelectedProduct
    })
  )

  return (
    <>
      <h1>MANAGE SPECIFICATIONS</h1>
      {/* <h3>selectedProduct: {selectedProduct}</h3>
      <h3>specificationId: {newSpecification.specificationId}</h3>
      <h3>title: {newSpecification.title}</h3>
      <h3>description: {newSpecification.description}</h3>*/}
      <div className={classes.form}>
        <AdminReactSelect
          label={'Select product'}
          options={productsList}
          onChange={(option) => {
            setSelectedProduct(option.value.id)
            fetchSpecificationsList(option.value.id).then()
          }}
        ></AdminReactSelect>
        {selectedProduct && <CreateSpecification />}
        <SpecificationTable />
      </div>
      {message && <MessageString message={message} />}
    </>
  )
}

export default ManageSpecifications
