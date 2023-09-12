import React from 'react'
import classes from './CreateSpecification.module.css'
import AdminNewInput from '@/components/UI/Admin/AdminNewInput/AdminNewInput'
import Button from '@/components/UI/Button/Button'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { createSpecificationByProductId } from '@/http/Admin/specifications'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const CreateSpecification = () => {
  const { fetchSpecificationsList } = useAdminListsStore((state) => ({
    fetchSpecificationsList: state.fetchSpecificationsList
  }))
  const {
    newSpecification,
    setNewSpecification,
    setMessage,
    selectedProduct,
    resetExclude
  } = useAdminStore((state) => ({
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
    setMessage: state.setMessage,
    selectedProduct: state.selectedProduct,
    resetExclude: state.resetExclude
  }))

  const create = async (specification) => {
    const formData = new FormData()
    formData.append('title', specification.title)
    formData.append('description', specification.description)
    formData.append('productId', selectedProduct)
    await createSpecificationByProductId(formData).then((r) => {
      setMessage(r)
      r.ok && resetExclude({ selectedProduct })
    })
    await fetchSpecificationsList(selectedProduct).then()
  }

  return (
    <>
      <div className={classes.inputContainer}>
        <AdminNewInput
          placeholder={'Title'}
          value={newSpecification.title}
          onChange={(e) => {
            setNewSpecification({
              ...newSpecification,
              title: e.target.value
            })
            setMessage(null)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              create(newSpecification).then()
            }
          }}
        ></AdminNewInput>
        <div className={classes.inputContainerVerticalSplitter}></div>
        <AdminNewInput
          placeholder={'Description'}
          value={newSpecification.description}
          onChange={(e) => {
            setNewSpecification({
              ...newSpecification,
              description: e.target.value
            })
            setMessage(null)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              create(newSpecification).then()
            }
          }}
        ></AdminNewInput>
      </div>
      <Button onClick={() => create(newSpecification).then()} style={'light'}>
        + ADD SPECIFICATION
      </Button>
    </>
  )
}

export default CreateSpecification