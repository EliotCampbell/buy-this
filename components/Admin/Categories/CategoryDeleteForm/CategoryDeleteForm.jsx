'use client'
import React, { useState } from 'react'
import {
  createCategory,
  deleteCategory as deleteCat
} from '@/http/Admin/categories'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import classes from '@/components/Admin/FormsStyles.module.css'
import { FiCheck, FiPlus, FiTrash } from 'react-icons/fi'
import Link from 'next/link'
import { useQueryStore } from '@/store/mainStore/store'
import AdminInput from '@/components/UI/AdminInput/AdminInput'

const CategoryDeleteForm = () => {
  const myRefs = React.useRef([])

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

  const deleteCategoryById = async (id) => {
    await deleteCat(id).then((r) => {
      setMessage(r)
      r.ok && reset()
    })
    await fetchCategoriesList().then()
  }

  return (
    <div className={classes.formDiv}>
      <h1>MANAGE CATEGORIES</h1>
      <div className={classes.form}>
        <AdminInput
          placeholder={'Add category...'}
          value={newCategory.name}
          onChange={(e) => {
            setNewCategory({ ...newCategory, name: e.target.value })
            setMessage(null)
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
        </AdminInput>

        {categoriesList.map((el) => (
          <div
            className={classes.listRow}
            key={el.value}
            onClick={() => {
              setSelectedCategory(el.value)
              myRefs.current[el.value].focus()
            }}
          >
            {selectedCategory !== el.value && (
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
            )}
            {selectedCategory === el.value && (
              <p
                ref={(element) => (myRefs.current[el.value] = element)}
                className={classes.name}
                role={'textbox'}
                contentEditable={true}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    console.log(event.target.textContent)
                  }
                }}
                onClick={(event) => {
                  event.stopPropagation()
                }}
                onBlur={() => setSelectedCategory(null)}
              >
                {`${el.label} (${productsList.reduce((acc, product) => {
                  if (product.value.categoryId === el.value) acc++
                  return acc
                }, 0)})`}
              </p>
            )}
            <div className={classes.icoBlock}>
              {selectedCategory === el.value && (
                <p
                  className={classes.editIco}
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedCategory(null)
                  }}
                >
                  {' '}
                  <FiCheck />
                </p>
              )}
              <p
                className={classes.removeIco}
                onClick={() => deleteCategoryById(el.value)}
              >
                <FiTrash />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryDeleteForm
