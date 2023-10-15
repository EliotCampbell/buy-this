import { fetchAllBrands } from '@/http/fetchers/fetchers'
import classes from './Brands.module.css'
import Link from 'next/link'

const Brands = async () => {
  const brands = await fetchAllBrands().then((data) => data.dataObject.brands)
  return (
    <div className={classes.brands}>
      <h1>BRANDS</h1>
      <div className={classes.brandsList}>
        {brands.map((brand) => (
          <Link key={brand.id} href={`/store?brandId=${brand.id}`}>
            {brand.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Brands
