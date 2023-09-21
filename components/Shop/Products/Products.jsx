'use client'

import React, { useEffect, useState } from 'react'
import classes from './Products.module.css'
import ProductPreviewCard from '../ProductPreviewCard/ProductPreviewCard'
import Pagination from '../../UI/Pagination/Pagination'
import { useProductStore, useQueryStore } from '@/store/mainStore/store'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'
import { fetchAllProducts } from '@/http/fetchers/fetchers'

const Products = () => {
  const { products, setProducts, productsCount, setProductsCount, categories } =
    useProductStore((state) => ({
      products: state.products,
      setProducts: state.setProducts,
      productsCount: state.productsCount,
      setProductsCount: state.setProductsCount,
      categories: state.categories
    }))

  const { query, setQuery } = useQueryStore((state) => ({
    query: state.query,
    setQuery: state.setQuery
  }))

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts(query)
        setProducts(data.dataObject.products)
        setProductsCount(data.dataObject.count)
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchProducts().finally()
  }, [query])

  const [selectState, setSelectState] = useState({
    countSelect: {
      label: query.limit.toString(),
      value: query.limit
    },
    orderSelect: { label: 'Price ascending', value: '[["price", "ASC"]]' }
  })

  return (
    <div className={classes.productsWrapper}>
      <h1>
        {query.categoryId
          ? categories.length > 0 &&
            categories
              .find((el) => el.id.toString() === query.categoryId.toString())
              .name.toUpperCase()
          : 'ALL PRODUCTS'}
      </h1>
      <div className={classes.order}>
        <p className={classes.offersCount}>Offers count: {productsCount}</p>
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
              value={selectState.countSelect}
              onChange={(option) => {
                setQuery({ ...query, limit: option.value })
                setSelectState({ ...selectState, countSelect: option })
              }}
            ></AdminReactSelect>
          </div>
          <div className={classes.orderSelectWrapper}>
            <AdminReactSelect
              label={'Order by'}
              options={[
                { label: 'Price ascending', value: '[["price", "ASC"]]' },
                { label: 'Price descending', value: '[["price", "DESC"]]' },
                { label: 'Name A-Z', value: '[["name", "ASC"]]' },
                { label: 'Name Z-A', value: '[["name", "DESC"]]' }
              ]}
              value={selectState.orderSelect}
              onChange={(option) => {
                setQuery({ ...query, order: option.value })
                setSelectState({ ...selectState, orderSelect: option })
              }}
            ></AdminReactSelect>
          </div>
        </div>
      </div>
      <div className={classes.splitter}></div>
      <div className={classes.products}>
        {products.map((el) => (
          <ProductPreviewCard
            productId={el.id}
            brandId={el.brandId}
            productName={el.name}
            productImg={`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}static/${el.img}`}
            productPrice={el.price}
            discountPrice={el.discountPrice}
            inStock={el.inStock}
            onSale={el.onSale}
            key={el.id}
          />
        ))}
      </div>
      )
      <Pagination />
    </div>
  )
}

export default Products
