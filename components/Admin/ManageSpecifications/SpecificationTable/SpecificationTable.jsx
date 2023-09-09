import React from 'react'
import classes from './SpecificationTable.module.css'
import AdminEditInput from '@/components/UI/Admin/AdminEditInput/AdminEditInput'
import { FiCheck, FiTrash } from 'react-icons/fi'
import {
  deleteSpecificationById,
  updateSpecificationById
} from '@/http/Admin/specifications'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useAdminStore } from '@/store/adminStore/adminStore'

const SpecificationTable = () => {
  const { specificationsList, fetchSpecificationsList } = useAdminListsStore(
    (state) => ({
      fetchSpecificationsList: state.fetchSpecificationsList,
      specificationsList: state.specificationsList
    })
  )

  const {
    newSpecification,
    setNewSpecification,
    resetExclude,
    selectedProduct,
    setMessage
  } = useAdminStore((state) => ({
    setMessage: state.setMessage,
    selectedProduct: state.selectedProduct,
    setNewSpecification: state.setNewSpecification,
    newSpecification: state.newSpecification,
    resetExclude: state.resetExclude
  }))

  const update = async (specification) => {
    const formData = new FormData()
    formData.append('title', specification.title)
    formData.append('description', specification.description)
    await updateSpecificationById(specification.id, formData).then((r) => {
      setMessage(r)
      r.ok && resetExclude({ selectedProduct })
    })
    await fetchSpecificationsList(selectedProduct).then()
  }

  const remove = async (id) => {
    await deleteSpecificationById(id).then((r) => {
      setMessage(r)
      r.ok && resetExclude({ selectedProduct })
    })
    await fetchSpecificationsList(selectedProduct).then()
  }

  return (
    <table className={classes.table}>
      <tbody>
        {specificationsList.map((specification) => (
          <tr key={specification.value.id}>
            <td className={classes.Td}>{specification.value.id}</td>
            <td className={classes.Td}>
              <AdminEditInput
                onFocus={() => {
                  setMessage(null)
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
                    update(newSpecification).then()
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
                <FiCheck
                  className={classes.submitIco}
                  onMouseDown={() => {
                    update(newSpecification).then()
                  }}
                />
              </AdminEditInput>
            </td>
            <td className={classes.Td}>
              <AdminEditInput
                onFocus={() => {
                  setMessage(null)
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
                    update(newSpecification).then()
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
                <FiCheck
                  className={classes.submitIco}
                  onMouseDown={() => {
                    update(newSpecification).then()
                  }}
                />
              </AdminEditInput>
            </td>
            <td className={classes.Td}>
              <FiTrash
                className={classes.removeIco}
                onClick={() => remove(specification.value.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SpecificationTable
