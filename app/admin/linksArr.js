import ManageCategories from '@/components/Admin/ManageCategories/ManageCategories'
import ManageBrands from '@/components/Admin/ManageBrands/ManageBrands'
import ManageSpecifications from '@/components/Admin/ManageSpecifications/ManageSpecifications'
import ManageProducts from '@/components/Admin/ManageProducts/ManageProducts'
import ManageUsers from '@/components/Admin/ManageUsers/ManageUsers'

export const linksArr = [
  {
    linkName: 'Categories',
    path: 'manage_categories',
    page: <ManageCategories />
  },
  {
    linkName: 'Brands',
    path: 'manage_brands',
    page: <ManageBrands />
  },
  {
    linkName: 'Products',
    path: 'manage_products',
    page: <ManageProducts />
  },
  {
    linkName: 'Specifications',
    path: 'manage_specification',
    page: <ManageSpecifications />
  },
  {
    linkName: 'Users',
    path: 'manage_users',
    page: <ManageUsers />
  }
]
