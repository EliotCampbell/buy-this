import ManageCategories from '@/components/Admin/ManageCategories/ManageCategories'
import ManageBrands from '@/components/Admin/ManageBrands/ManageBrands'
import ManageSpecifications from '@/components/Admin/ManageSpecifications/ManageSpecifications'
import ManageProducts from '@/components/Admin/ManageProducts/ManageProducts'
import ManageUsers from '@/components/Admin/ManageUsers/ManageUsers'
import {
  FiGrid,
  FiInfo,
  FiList,
  FiShoppingBag,
  FiTag,
  FiUsers
} from 'react-icons/fi'
import Orders from '@/components/Admin/Orders/Orders'

export const linksArr = [
  {
    ico: <FiList />,
    linkName: 'Categories',
    path: 'manage_categories',
    page: <ManageCategories />
  },
  {
    ico: <FiTag />,
    linkName: 'Brands',
    path: 'manage_brands',
    page: <ManageBrands />
  },
  {
    ico: <FiGrid />,
    linkName: 'Products',
    path: 'manage_products',
    page: <ManageProducts />
  },
  {
    ico: <FiInfo />,
    linkName: 'Specifications',
    path: 'manage_specification',
    page: <ManageSpecifications />
  },
  {
    ico: <FiUsers />,
    linkName: 'Users',
    path: 'manage_users',
    page: <ManageUsers />
  },
  {
    ico: <FiShoppingBag />,
    linkName: 'orders',
    path: 'orders',
    page: <Orders />
  }
]
