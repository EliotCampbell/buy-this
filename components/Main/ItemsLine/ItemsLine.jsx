'use client'
import React, { useRef, useState } from 'react'
import classes from './ItemsLine.module.css'
import ProductPreviewCard from '../../../components/Shop/ProductPreviewCard/ProductPreviewCard'

const ItemsLine = ({ title, dark, products }) => {
  const scrollContainerRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScrollLeft = () => {
    scrollPosition > 0 && setScrollPosition(scrollPosition - 360) // Adjust the scroll distance as needed
  }

  const handleScrollRight = () => {
    scrollPosition < (products.length - 4) * 360 &&
      setScrollPosition(scrollPosition + 360) // Adjust the scroll distance as needed*/
  }

  return (
    <div className={`${classes.lineWrapper} ${dark && classes.dark}`}>
      <div className={classes.line}>
        <p className={classes.title}>{title}</p>
        <div className={classes.productsLineWrapper}>
          {products.length > 0 ? (
            <div
              className={classes.productsLine}
              ref={scrollContainerRef}
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {products?.map((el) => (
                <ProductPreviewCard
                  productId={el.id}
                  brand={el.brand}
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
          ) : (
            <div className={classes.placeholder}>
              <h2>{`No products with checked parameter "#${title.toLowerCase()}" in admin menu.`}</h2>
            </div>
          )}
          <button className={classes.slideButtonL} onClick={handleScrollLeft}>
            {'<'}
          </button>
          <button className={classes.slideButtonR} onClick={handleScrollRight}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemsLine
