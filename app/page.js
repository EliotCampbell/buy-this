import Main from '../components/Main/Main'
import ProductsStore from '@/store/productsStore'

async function getData() {
  const res = await fetch('http://localhost:3000/api/product')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()
  ProductsStore.setProducts(data.dataObject.products.rows)
  console.log(ProductsStore.products[0].id)
  return <Main />
}
