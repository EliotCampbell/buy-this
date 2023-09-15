import React from 'react'
import classes from '@/components/Admin/FormsStyles.module.css'
import Link from 'next/link'
import { FiCheck, FiCornerDownLeft, FiTrash } from 'react-icons/fi'
import AdminEditInput from '@/components/UI/Admin/AdminEditInput/AdminEditInput'
import { useQueryStore, useUserStore } from '@/store/mainStore/store'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { deleteCategory, updateCategory } from '@/http/Admin/categories'

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

  const { setMessage } = useUserStore((state) => ({
    setMessage: state.setMessage
  }))

  const updateHandler = async (id, name) => {
    await updateCategory(id, name).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && (await fetchCategoriesList().then())
    })
  }

  const deleteCategoryById = async (id) => {
    await deleteCategory(id).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && (await fetchCategoriesList().then())
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
            deleteCategoryById(item.value).then()
          }}
        />
      </div>
    </div>
  )
}

export default CategoryRowItem
