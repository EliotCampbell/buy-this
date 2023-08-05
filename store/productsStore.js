import { makeAutoObservable } from 'mobx'

class ProductsStore {
  constructor() {
    this._categories = []
    this._brands = []
    this._products = []
    this._productsCount = null
    this._specifications = []
    makeAutoObservable(this)
  }

  setCategories(categories) {
    this._categories = [
      ...categories.sort((a, b) => a.name.localeCompare(b.name))
    ]
  }

  setBrands(brands) {
    this._brands = [...brands.sort((a, b) => a.name.localeCompare(b.name))]
  }

  setProducts(products) {
    this._products = [...products]
  }

  setProductsCount(count) {
    this._productsCount = count
  }

  setSpecifications(specifications) {
    this._specifications = [...specifications]
  }

  get categories() {
    return this._categories
  }

  get brands() {
    return this._brands
  }

  get products() {
    return this._products
  }

  get productsCount() {
    return this._productsCount
  }

  get specifications() {
    return this._specifications
  }
}

export default new ProductsStore()