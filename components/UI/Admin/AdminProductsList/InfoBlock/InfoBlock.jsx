import React from 'react'
import classes from './InfoBlock.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import Link from 'next/link'
import { useAdminStore } from '@/store/adminStore/adminStore'

const InfoBlock = ({ element }) => {
  const { setSelectedProduct } = useAdminStore((state) => ({
    setSelectedProduct: state.setSelectedProduct
  }))
  const { categoriesList, brandsList, fetchSpecificationsList } =
    useAdminListsStore((state) => ({
      fetchSpecificationsList: state.fetchSpecificationsList,
      categoriesList: state.categoriesList,
      brandsList: state.brandsList
    }))
  return (
    <div className={classes.infoWrapper}>
      <div className={classes.infoDiv}>
        <div className={classes.id}>
          <p className={classes.idTitle}>ID:</p>
          <p className={classes.idNumber}>{element.value.id}</p>
        </div>

        <Link href={'/product/' + element.value.id}>
          <p
            className={classes.name}
            placeholder={'Edit...'}
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            {element.value.name}
          </p>
        </Link>
        <div className={classes.categoryAndBrand}>
          <p className={classes.title}>Category:</p>
          <p className={classes.info}>{` ${
            categoriesList.find(
              (el) =>
                el.value.toString() === element.value.categoryId.toString()
            ).label
          }`}</p>
          <p className={classes.title}>Brand:</p>
          <p className={classes.info}>
            {
              brandsList.find(
                (el) => el.value.toString() === element.value.brandId.toString()
              ).label
            }
          </p>
        </div>
        <div className={classes.specifications}>
          <p className={classes.title}>Specifications:</p>
          <Link href={'/admin/manage_specification'}>
            <p
              className={classes.specificationsCount}
              onClick={() => {
                setSelectedProduct(element.value.id)
                fetchSpecificationsList(element.value.id).then()
              }}
            >{` (${element.value.info.length})`}</p>
          </Link>
        </div>
      </div>
      <p className={classes.price}>{`${Number.parseFloat(
        element.value.price
      ).toFixed(2)} €`}</p>
    </div>
  )
}

export default InfoBlock
