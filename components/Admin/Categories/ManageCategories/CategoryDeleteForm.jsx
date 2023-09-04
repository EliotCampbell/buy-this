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
import { FiCheck, FiPlus, FiTrash } from 'react-icons/fi'
import Link from 'next/link'
import { useQueryStore } from '@/store/mainStore/store'
import AdminNewInput from '@/components/UI/AdminNewInput/AdminNewInput'
import AdminEditInput from '@/components/UI/AdminEditInput/AdminEditInput'
import MessageString from '@/components/UI/MessageString/MessageString'

const CategoryDeleteForm = () => {
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
    await createCategory(newCategory).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchCategoriesList().then()
  }

  const update = async (id, name) => {
    await updateCategory(id, name).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchCategoriesList().then()
  }

  const deleteCategoryById = async (id) => {
    await deleteCategory(id).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchCategoriesList().then()
  }

  return (
    <div className={classes.formDiv}>
      <h1>MANAGE CATEGORIES</h1>
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
            <p className={classes.submitIco}>
              <FiPlus
                onClick={() => {
                  create().then()
                }}
              />
            </p>
          </div>
        </AdminNewInput>
        <div className={classes.splitter}></div>

        {categoriesList.map((el) => (
          <div className={classes.listRow} key={el.value}>
            {/*{selectedCategory !== el.value && (
              <Link
                href={'/store'}
                onClick={() => {
                  setQuery({ ...query, categoryId: el.value })
                }}
              >
                <p className={classes.name}>
                  {`${el.label} (${productsList.reduce((acc, product) => {
                    if (product.value.categoryId === el.value) acc++
                    return acc
                  }, 0)})`}
                </p>
              </Link>
            )}*/}
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
                <p
                  className={classes.editIco}
                  onMouseDown={(event) => {
                    event.stopPropagation()
                    update(el.value, newCategory.name).then()
                    setSelectedCategory(null)
                  }}
                >
                  <FiCheck />
                </p>
              )}
              <p
                className={classes.removeIco}
                onClick={(event) => {
                  event.stopPropagation()
                  deleteCategoryById(el.value).then()
                }}
              >
                <FiTrash />
              </p>
            </div>
          </div>
        ))}
      </div>
      {message && <MessageString message={message} />}
    </div>
  )
}

export default CategoryDeleteForm
