import React, { useState } from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import Link from 'next/link'
import { FiCheck, FiCornerDownLeft, FiTrash } from 'react-icons/fi'
import AdminEditInput from '@/components/UI/Admin/AdminEditInput/AdminEditInput'
import { useQueryStore } from '@/store/mainStore/store'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { deleteCategory, updateCategory } from '@/http/Admin/categories'
import MessageString from '@/components/UI/MessageString/MessageString'

const CategoryRowItem = ({ item, setSelectedCategory, selectedCategory }) => {
  const { query, setQuery } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  const { productsList, fetchCategoriesList } = useAdminListsStore((state) => ({
    productsList: state.productsList,
    fetchCategoriesList: state.fetchCategoriesList
  }))

  const { newCategory, setNewCategory, reset } = useAdminStore((state) => ({
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  const [message, setMessage] = useState(null)

  const updateHandler = async (id, name) => {
    await updateCategory(id, name).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && fetchCategoriesList().then()
    })
  }
  const deleteCategoryByIdHandler = async (id) => {
    await deleteCategory(id).then((r) => {
      !r.ok && setMessage(r)
      r.ok && reset()
      r.ok && fetchCategoriesList()
    })
  }

  return (
    <div className={classes.categoriesBrandslistRow}>
      <Link
        href={'/store'}
        onClick={() => {
          setQuery({ ...query, categoryId: item.value })
        }}
      >
        <FiCornerDownLeft className={classes.linkIco} />
      </Link>
      <AdminEditInput
        onFocus={() => {
          setMessage(null)
          setSelectedCategory(item.value)
          setNewCategory({ ...newCategory, name: item.label })
        }}
        onChange={(event) => {
          setMessage(null)
          setNewCategory({
            ...newCategory,
            name: event.target.value
          })
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            updateHandler(item.value, newCategory.name).then(() =>
              setSelectedCategory(null)
            )
            event.target.blur()
          }
          if (event.key === 'Escape') {
            setNewCategory({ ...newCategory, name: '' })
            setSelectedCategory(null)
          }
        }}
        onBlur={() => {
          setNewCategory({ ...newCategory, name: '' })
          setSelectedCategory(null)
        }}
        value={
          item.value === selectedCategory
            ? newCategory.name
            : `${item.label} (${productsList.reduce((acc, product) => {
                if (product.value.categoryId === item.value) acc++
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
        {selectedCategory === item.value && (
          <FiCheck
            className={classes.submitIco}
            onMouseDown={(event) => {
              event.stopPropagation()
              updateHandler(item.value, newCategory.name).then()
              setSelectedCategory(null)
            }}
          />
        )}
        <FiTrash
          className={classes.removeIco}
          onClick={(event) => {
            event.stopPropagation()
            deleteCategoryByIdHandler(item.value).then()
          }}
        />
      </div>
    </div>
  )
}

export default CategoryRowItem
