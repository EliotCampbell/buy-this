'use client'
import React, { useState } from 'react'
import {
  createCategory,
  deleteCategory,
  updateCategory
} from '@/http/Admin/categories'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'
import { FiCheck, FiCornerDownLeft, FiPlus, FiTrash } from 'react-icons/fi'
import { useQueryStore } from '@/store/mainStore/store'
import AdminNewInput from '@/components/UI/Admin/AdminNewInput/AdminNewInput'
import AdminEditInput from '@/components/UI/Admin/AdminEditInput/AdminEditInput'
import MessageString from '@/components/UI/MessageString/MessageString'
import Link from 'next/link'

const ManageCategories = () => {
  const [message, setMessage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { query, setQuery } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  const { categoriesList, productsList, fetchCategoriesList } =
    useAdminListsStore((state) => ({
      categoriesList: state.categoriesList,
      productsList: state.productsList,
      fetchCategoriesList: state.fetchCategoriesList
    }))

  const { newCategory, setNewCategory, reset } = useAdminStore((state) => ({
    newCategory: state.newCategory,
    setNewCategory: state.setNewCategory,
    reset: state.reset
  }))

  const create = async () => {
    await createCategory(newCategory).then(async (r) => {
      setMessage(r)
      r.ok && reset()
      r.ok && (await fetchCategoriesList().then())
    })
  }

  const update = async (id, name) => {
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
    <>
      <h1>MANAGE CATEGORIES</h1>
      <div className={classes.formWithSidePreview}>
        <div className={classes.form}>
          <AdminNewInput
            placeholder={'Add category...'}
            value={!selectedCategory ? newCategory.name : ''}
            onChange={(e) => {
              setNewCategory({ ...newCategory, name: e.target.value })
              setMessage(null)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                create().then()
              }
            }}
          >
            <div className={classes.icoBlock}>
              <FiPlus
                className={classes.submitIco}
                onClick={() => {
                  create().then()
                }}
              />
            </div>
          </AdminNewInput>

          {categoriesList.map((el) => (
            <div className={classes.categoriesBrandslistRow} key={el.value}>
              <Link
                href={'/store'}
                onClick={() => {
                  setQuery({ ...query, categoryId: el.value })
                }}
              >
                <FiCornerDownLeft className={classes.linkIco} />
              </Link>
              <AdminEditInput
                key={el.value}
                onFocus={() => {
                  setMessage(null)
                  setSelectedCategory(el.value)
                  setNewCategory({ ...newCategory, name: el.label })
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
                    update(el.value, newCategory.name).then(() =>
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
                  el.value === selectedCategory
                    ? newCategory.name
                    : `${el.label} (${productsList.reduce((acc, product) => {
                        if (product.value.categoryId === el.value) acc++
                        return acc
                      }, 0)})`
                }
                placeholder={'Edit...'}
                onClick={(event) => {
                  event.stopPropagation()
                }}
              ></AdminEditInput>

              <div className={classes.icoBlock}>
                {selectedCategory === el.value && (
                  <FiCheck
                    className={classes.submitIco}
                    onMouseDown={(event) => {
                      event.stopPropagation()
                      update(el.value, newCategory.name).then()
                      setSelectedCategory(null)
                    }}
                  />
                )}
                <FiTrash
                  className={classes.removeIco}
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteCategoryById(el.value).then()
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {message && <MessageString message={message} />}
    </>
  )
}

export default ManageCategories
