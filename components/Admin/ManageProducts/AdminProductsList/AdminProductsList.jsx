import classes from './AdminProductsList.module.css'
import Link from 'next/link'
import { FiCornerDownLeft } from 'react-icons/fi'
import Image from 'next/image'
import ProductUpdateForm from '@/components/Admin/ManageProducts/ProductUpdateForm/ProductUpdateForm'
import React from 'react'
import { useAdminStore } from '@/store/adminStore/adminStore'
import ButtonBlock from '@/components/Admin/ManageProducts/AdminProductsList/ButtonBlock/ButtonBlock'
import InfoBlock from '@/components/Admin/ManageProducts/AdminProductsList/InfoBlock/InfoBlock'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const AdminProductsList = ({ setShowNewProductForm }) => {
  const { newProduct } = useAdminStore((state) => ({
    newProduct: state.newProduct
  }))
  const { productsList } = useAdminListsStore((state) => ({
    productsList: state.productsList
  }))

  return productsList.map((el) => (
    <div
      className={`${classes.productsListRowWrapper} ${
        el.value.id === newProduct.oldProductId && classes.changeBackground
      }`}
      key={el.value.id}
    >
      <div className={classes.productsListRow}>
        <div className={classes.productsInfo}>
          <Link href={'/product/' + el.value.id}>
            <FiCornerDownLeft className={classes.linkIco} />
          </Link>
          {el.value.id !== newProduct.oldProductId && (
            <>
              <Link href={'/product/' + el.value.id}>
                <div className={classes.productMiniImgDiv}>
                  <Image
                    className={classes.productMiniImg}
                    alt={'image'}
                    src={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.value.img}`}
                    fill={true}
                    sizes="(max-width: 1920px) 100px"
                  />
                </div>
              </Link>
              <InfoBlock element={el} />
            </>
          )}
          {el.value.id === newProduct.oldProductId && (
            <p className={classes.name}>{el.value.name}</p>
          )}
        </div>
        <ButtonBlock
          element={el}
          setShowNewProductForm={setShowNewProductForm}
        />
      </div>
      {el.value.id === newProduct.oldProductId && (
        <div className={classes.productEditInline}>
          <ProductUpdateForm />
        </div>
      )}
    </div>
  ))
}

export default AdminProductsList
