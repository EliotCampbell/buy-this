import ManageCategories from '@/components/Admin/ManageCategories/ManageCategories'
import ManageBrands from '@/components/Admin/ManageBrands/ManageBrands'
import ProductCreateForm from '@/components/Admin/ManageProducts/ProductCreate/ProductCreateForm'
import ManageSpecifications from '@/components/Admin/ManageSpecifications/ManageSpecifications'
import ManageProducts from '@/components/Admin/ManageProducts/ManageProducts'

export const linksArr = [
  { title: 'Categories' },
  {
    linkName: 'Manage categories',
    path: 'manage_categories',
    page: <ManageCategories />
  },
  { title: 'Brands' },
  {
    linkName: 'Manage brands',
    path: 'manage_brands',
    page: <ManageBrands />
  },
  { title: 'Products' },
  {
    linkName: 'Manage products',
    path: 'manage_products',
    page: <ManageProducts />
  },
  {
    linkName: 'Create product',
    path: 'create_product',
    page: <ProductCreateForm />
  },
  { title: 'Specifications' },
  {
    linkName: 'Manage specifications',
    path: 'manage_specification',
    page: <ManageSpecifications />
  }
]
