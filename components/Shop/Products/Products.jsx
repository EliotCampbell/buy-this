import React from 'react'
import classes from './Products.module.css'
import ProductPreviewCard from '../ProductPreviewCard/ProductPreviewCard'
import ReactSelect from '../../UI/ReactSelect/ReactSelect'
import Pagination from '../../UI/Pagination/Pagination'
import { useProductStore } from '@/store/store'

const Products = ({ setSearchQueryState, searchQueryState }) => {
  return (
    <div className={classes.productsWrapper}>
      <h1>
        {searchQueryState.queryParams.categoryId
          ? useProductStore.getState().categories.length > 0 &&
            useProductStore
              .getState()
              .categories.find(
                (el) =>
                  el.id.toString() ===
                  searchQueryState?.queryParams?.categoryId.toString()
              )
              .name.toUpperCase()
          : 'ALL PRODUCTS'}
      </h1>
      <div className={classes.order}>
        <p className={classes.offersCount}>
          Offers count: {ProductsStore.productsCount}
        </p>
        <div className={classes.selectWrapper}>
          <ReactSelect
            label={'Order by'}
            options={[
              { label: 'Price ascending', value: '[["price", "ASC"]]' },
              { label: 'Price descending', value: '[["price", "DESC"]]' },
              { label: 'Name A-Z', value: '[["name", "ASC"]]' },
              { label: 'Name Z-A', value: '[["name", "DESC"]]' }
            ]}
            onChange={(option) => {
              setSearchQueryState({
                ...searchQueryState,
                queryParams: {
                  ...searchQueryState.queryParams,
                  order: option.value
                }
              })
            }}
          ></ReactSelect>
        </div>
      </div>
      <div className={classes.splitter}></div>
      <div className={classes.products}>
        {useProductStore.getState().products.map((el) => (
          <ProductPreviewCard
            productId={el.id}
            brandId={el.brandId}
            productName={el.name}
            productImg={process.env.REACT_APP_API_URL + el.img}
            productPrice={el.price}
            key={el.id}
          />
        ))}
      </div>
      <Pagination />
    </div>
  )
}

export default Products
