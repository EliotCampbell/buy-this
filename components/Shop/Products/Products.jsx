'use client'

import React, { useEffect, useState } from 'react'
import classes from './Products.module.css'
import ProductPreviewCard from '../ProductPreviewCard/ProductPreviewCard'
import Pagination from '../../UI/Pagination/Pagination'
import { useProductStore, useQueryStore } from '@/store/mainStore/store'
import AdminReactSelect from '@/components/UI/AdminInputs/AdminReactSelect/AdminReactSelect'

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

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_REACT_APP_API_URL +
            'api/product?' +
            new URLSearchParams(query)
        )

        const data = await res.json()
        setProducts(data.dataObject.products)
        setProductsCount(data.dataObject.count)
        setIsLoaded(true)
      } catch (e) {
        console.log(e)
      }
    }
    fetchProducts().finally()
  }, [query])

  const [selectState, setSelectState] = useState({
    countSelect: { label: query.limit.toString(), value: query.limit }
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
                { label: '6', value: 6 },
                { label: '9', value: 9 },
                { label: '12', value: 12 },
                { label: '15', value: 15 }
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
      {isLoaded ? (
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
              key={el.id}
            />
          ))}
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}

      <Pagination />
    </div>
  )
}

export default Products
