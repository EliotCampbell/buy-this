'use client'
import React, { useRef, useState } from 'react'
import classes from './ItemsLine.module.css'
import ProductPreviewCard from '../../../components/Shop/ProductPreviewCard/ProductPreviewCard'

const ItemsLine = ({ title, products }) => {
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
    <div className={classes.lineWrapper}>
      <div className={classes.line}>
        <p className={classes.title}>{title}</p>
        <div className={classes.productsLineWrapper}>
          <div
            className={classes.productsLine}
            ref={scrollContainerRef}
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {products.map((el) => (
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
