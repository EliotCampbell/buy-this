import React from 'react'
import classes from './ButtonBlock.module.css'
import { FiEdit2, FiTrash, FiX } from 'react-icons/fi'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { deleteProduct } from '@/http/Admin/products'
import { useUserStore } from '@/store/mainStore/store'

const ButtonBlock = ({ element, setShowNewProductForm }) => {
  const { categoriesList, brandsList, fetchProductsList } = useAdminListsStore(
    (state) => ({
      categoriesList: state.categoriesList,
      brandsList: state.brandsList,
      fetchProductsList: state.fetchProductsList
    })
  )

  const { newProduct, setPreview, setNewProduct, reset } = useAdminStore(
    (state) => ({
      setPreview: state.setPreview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset
    })
  )

  const { setMessage } = useUserStore((state) => ({
    setMessage: state.setMessage
  }))

  const deleteHandler = async (id) => {
    await deleteProduct(id).then((r) => {
      setMessage(r)
    })
    await fetchProductsList()
  }

  return (
    <div className={classes.icoBlock}>
      {element.value.id === newProduct.oldProductId ? (
        <FiX
          className={classes.removeIco}
          onMouseDown={() => {
            reset()
          }}
        />
      ) : (
        <FiEdit2
          className={classes.editIco}
          onMouseDown={() => {
            setShowNewProductForm(false)
            setNewProduct({
              ...newProduct,
              category: {
                label: categoriesList.find(
                  (el) =>
                    el.value.toString() === element.value.categoryId.toString()
                ).label,
                value: element.value.categoryId
              },
              brand: {
                label: brandsList.find(
                  (el) =>
                    el.value.toString() === element.value.brandId.toString()
                ).label,
                value: element.value.brandId
              },
              name: element.value.name,
              price: element.value.price,
              description: element.value.description,
              oldProductId: element.value.id,
              file: element.value.img
            })
            setPreview(
              process.env.NEXT_PUBLIC_REACT_APP_API_URL +
                `static/` +
                element.value.img
            )
          }}
        />
      )}
      <FiTrash
        className={classes.removeIco}
        onMouseDown={() => deleteHandler(element.value.id)}
      />
    </div>
  )
}

export default ButtonBlock
