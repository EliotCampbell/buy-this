import React from 'react'
import classes from './ProductPreviewCard.module.css'
import { observer } from 'mobx-react-lite'
import ProductsStore from '../../../store/productsStore'


const ProductPreviewCard = observer(
  ({ productId, brandId, productName, productImg, productPrice }) => {
    return (
      <div className={classes.productsCardWrapper}>
        <div to={`/p/${productId}`} className={classes.productsCard}>
          <div>
            <p className={classes.brand}>
              {brandId === ''
                ? 'Brand'
                : ProductsStore.brands.find(
                    (el) => el.id.toString() === brandId.toString()
                  ).name}
            </p>
            <p className={classes.name}>{productName}</p>
          </div>
          <div className={classes.imgDiv}>
            <img className={classes.img} src={productImg} alt="img" />
          </div>
          <div className={classes.priceAvailabilityDiv}>
            <p className={classes.inStock}>In stock</p>
            <p className={classes.price}>{`${productPrice},00 €`}</p>
          </div>
        </div>
      </div>
    )
  }
)

export default ProductPreviewCard
