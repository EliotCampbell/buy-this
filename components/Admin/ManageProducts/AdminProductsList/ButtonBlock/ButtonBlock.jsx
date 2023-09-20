import React, { useState } from 'react'
import classes from './ButtonBlock.module.css'
import { FiEdit2, FiTrash, FiX } from 'react-icons/fi'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { useAdminStore } from '@/store/adminStore/adminStore'
import { deleteProduct } from '@/http/Admin/products'
import MessageString from '@/components/UI/MessageString/MessageString'

const ButtonBlock = ({ element, setShowNewProductForm }) => {
  const { categoriesList, fetchProductsList } = useAdminListsStore((state) => ({
    categoriesList: state.categoriesList,
    brandsList: state.brandsList,
    fetchProductsList: state.fetchProductsList
  }))

  const { newProduct, setPreview, setNewProduct, reset } = useAdminStore(
    (state) => ({
      setPreview: state.setPreview,
      newProduct: state.newProduct,
      setNewProduct: state.setNewProduct,
      reset: state.reset
    })
  )

  const [message, setMessage] = useState(null)

  const deleteHandler = async (id) => {
    await deleteProduct(id).then((r) => {
      !r.ok && setMessage(r)
    })
    await fetchProductsList()
  }

  return (
    <div className={classes.icoBlock}>
      <MessageString message={message} setMessage={setMessage} />
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
            console.log(element.value)
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
                label: element.value.brand.name,
                value: element.value.brand.id
              },
              name: element.value.name,
              price: element.value.price,
              description: element.value.description,
              oldProductId: element.value.id,
              file: element.value.img,
              onSale: element.value.onSale,
              highlight: element.value.highlight,
              hotDeal: element.value.hotDeal,
              discountPrice: element.value.discountPrice,
              inStock: element.value.inStock
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
