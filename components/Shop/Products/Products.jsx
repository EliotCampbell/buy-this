'use client'

import React from 'react'
import classes from './Products.module.css'
import ProductPreviewCard from '../ProductPreviewCard/ProductPreviewCard'
import Pagination from '../../UI/Pagination/Pagination'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import { useCustomRouter } from '@/components/Shop/useCustomRouter'
import { useSearchParams } from 'next/navigation'

const Products = ({ products, categories }) => {
  const { addSearchParam, addMultiSearchParam } = useCustomRouter()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId')
  const limit = searchParams.get('limit')
  /*  const orderKey = searchParams.get('orderKey')
  const orderValue = searchParams.get('orderValue')*/
  return (
    <div className={classes.productsWrapper}>
      <h1>
        {categoryId
          ? categories &&
            categories
              .find((el) => el.id.toString() === categoryId)
              .name.toUpperCase()
          : 'ALL PRODUCTS'}
      </h1>
      <div className={classes.order}>
        <p className={classes.offersCount}>Offers count: {products.count}</p>
        <div className={classes.selectsWrapper}>
          <div className={classes.countSelectWrapper}>
            <AdminReactSelect
              label={'Count on page'}
              options={[
                { label: '18', value: 18 },
                { label: '24', value: 24 },
                { label: '32', value: 32 },
                { label: '64', value: 64 }
              ]}
              placeholder={'Choose...'}
              value={limit ? { label: limit, value: limit } : null}
              onChange={(option) => addSearchParam('limit', option.value)}
              isSearchable={false}
            ></AdminReactSelect>
          </div>
          <div className={classes.orderSelectWrapper}>
            <AdminReactSelect
              label={'Order by'}
              options={[
                {
                  label: 'Price ascending',
                  value: { orderKey: 'price', orderValue: 'ASC' }
                },
                {
                  label: 'Price descending',
                  value: { orderKey: 'price', orderValue: 'DESC' }
                },
                {
                  label: 'Name A-Z',
                  value: { orderKey: 'name', orderValue: 'ASC' }
                },
                {
                  label: 'Name Z-A',
                  value: { orderKey: 'name', orderValue: 'DESC' }
                }
              ]}
              isSearchable={false}
              onChange={(option) => addMultiSearchParam(option.value)}
            ></AdminReactSelect>
          </div>
        </div>
      </div>
      <div className={classes.splitter}></div>
      <div className={classes.products}>
        {products.rows.length ? (
          products.rows.map((el) => (
            <ProductPreviewCard
              productId={el.id}
              brand={el.brand.name}
              productName={el.name}
              productImg={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.img}`}
              productPrice={el.price}
              discountPrice={el.discountPrice}
              inStock={el.inStock}
              onSale={el.onSale}
              key={el.id}
            />
          ))
        ) : (
          <h3 className={classes.placeholder}>Products not found.</h3>
        )}
      </div>
      <Pagination products={products} />
    </div>
  )
}

export default Products
