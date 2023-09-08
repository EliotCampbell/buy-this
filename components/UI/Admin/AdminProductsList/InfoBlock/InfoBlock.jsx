import React from 'react'
import classes from './InfoBlock.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'

const InfoBlock = ({ element }) => {
  const { categoriesList, brandsList } = useAdminListsStore((state) => ({
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
        <p
          className={classes.name}
          placeholder={'Edit...'}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          {element.value.name}
        </p>
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
          <p className={classes.info}>{` (${element.value.info.length})`}</p>
        </div>
      </div>
      <p className={classes.price}>{`${Number.parseFloat(
        element.value.price
      ).toFixed(2)} €`}</p>
    </div>
  )
}

export default InfoBlock
