import React, { useState } from 'react'
import classes from '@/components/Admin/ManageSpecifications/SpecificationTable/SpecificationTable.module.css'
import AdminEditInput from '@/components/UI/Admin/AdminEditInput/AdminEditInput'
import { FiCheck, FiTrash } from 'react-icons/fi'
import MessageString from '@/components/UI/MessageString/MessageString'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useAdminStore } from '@/store/adminStore/adminStore'
import {
  deleteSpecificationById,
  updateSpecificationById
} from '@/http/Admin/specifications'

const SpecificationTableRow = ({ specification }) => {
  const [message, setMessage] = useState(null)

  const { fetchSpecificationsList } = useAdminListsStore((state) => ({
    fetchSpecificationsList: state.fetchSpecificationsList
  }))

  const {
    newSpecification,
    setNewSpecification,
    resetExclude,
    selectedProduct
  } = useAdminStore((state) => ({
    selectedProduct: state.selectedProduct,
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
    resetExclude: state.resetExclude
  }))

  const updateHandler = async (specification) => {
    const formData = new FormData()
    formData.append('title', specification.title)
    formData.append('description', specification.description)
    await updateSpecificationById(specification.id, formData).then((r) => {
      setMessage(r)
      r.ok && resetExclude({ selectedProduct })
    })
    await fetchSpecificationsList(selectedProduct).then()
  }

  const removeHandler = async (id) => {
    await deleteSpecificationById(id).then((r) => {
      setMessage(r)
      r.ok && resetExclude({ selectedProduct })
    })
    await fetchSpecificationsList(selectedProduct).then()
  }

  const [focusedItem, setFocusedItem] = useState(null)

  return (
    <div className={classes.tableRow} key={specification.value.id}>
      <p className={classes.id}>{'id: ' + specification.value.id}</p>
      <div className={classes.Td}>
        <AdminEditInput
          onFocus={() => {
            setFocusedItem('title')
            setNewSpecification({
              id: specification.value.id,
              title: specification.value.title,
              description: specification.value.description
            })
          }}
          onChange={(event) => {
            setMessage(null)
            setNewSpecification({
              ...newSpecification,
              title: event.target.value
            })
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              updateHandler(newSpecification).then()
              event.target.blur()
            }
            if (event.key === 'Escape') {
              event.target.blur()
            }
          }}
          onBlur={() => {
            setNewSpecification({
              id: '',
              title: '',
              description: ''
            })
          }}
          value={
            newSpecification.id !== specification.value.id
              ? specification.value.title
              : newSpecification.title
          }
          placeholder={'Title...'}
        >
          <MessageString message={message} setMessage={setMessage} />
          {focusedItem === 'title' &&
            newSpecification.id === specification.value.id && (
              <FiCheck
                className={classes.submitIco}
                onMouseDown={() => {
                  updateHandler(newSpecification).then()
                }}
              />
            )}
        </AdminEditInput>
      </div>
      <div className={classes.inputsDiv}>
        <div className={classes.Td}>
          <AdminEditInput
            onFocus={() => {
              setFocusedItem('description')
              setNewSpecification({
                id: specification.value.id,
                title: specification.value.title,
                description: specification.value.description
              })
            }}
            onChange={(event) => {
              setMessage(null)
              setNewSpecification({
                ...newSpecification,
                description: event.target.value
              })
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateHandler(newSpecification).then()
                event.target.blur()
              }
              if (event.key === 'Escape') {
                event.target.blur()
              }
            }}
            onBlur={() => {
              setNewSpecification({
                id: '',
                title: '',
                description: ''
              })
            }}
            value={
              newSpecification.id !== specification.value.id
                ? specification.value.description
                : newSpecification.description
            }
            placeholder={'Description...'}
          >
            <MessageString message={message} setMessage={setMessage} />
            {focusedItem === 'description' &&
              newSpecification.id === specification.value.id && (
                <FiCheck
                  className={classes.submitIco}
                  onMouseDown={() => {
                    updateHandler(newSpecification).then()
                  }}
                />
              )}
          </AdminEditInput>
        </div>
      </div>
      <div className={classes.toTrash}>
        <FiTrash
          className={classes.removeIco}
          onClick={() => removeHandler(specification.value.id)}
        />
      </div>
    </div>
  )
}

export default SpecificationTableRow
