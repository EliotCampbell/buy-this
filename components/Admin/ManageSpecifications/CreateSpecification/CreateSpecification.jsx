import React from 'react'
import classes from './CreateSpecification.module.css'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import Button from '@/components/UI/Button/Button'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { createSpecificationByProductId } from '@/http/Admin/specifications'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useUserStore } from '@/store/mainStore/store'

const CreateSpecification = () => {
  const { fetchSpecificationsList } = useAdminListsStore((state) => ({
    fetchSpecificationsList: state.fetchSpecificationsList
  }))
  const {
    newSpecification,
    setNewSpecification,
    selectedProduct,
    resetExclude
  } = useAdminStore((state) => ({
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
    selectedProduct: state.selectedProduct,
    resetExclude: state.resetExclude
  }))

  const { setMessage } = useUserStore((state) => ({
    setMessage: state.setMessage
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
        <AdminInput
          placeholder={'Title'}
          value={!newSpecification.id ? newSpecification.title : ''}
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
        ></AdminInput>
        <div className={classes.inputContainerVerticalSplitter}></div>
        <AdminInput
          placeholder={'Description'}
          value={!newSpecification.id ? newSpecification.description : ''}
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
        ></AdminInput>
      </div>
      <Button onClick={() => create(newSpecification).then()} style={'light'}>
        + ADD SPECIFICATION
      </Button>
    </>
  )
}

export default CreateSpecification
