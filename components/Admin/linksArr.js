import ManageCategories from '@/components/Admin/ManageCategories/ManageCategories'
import ManageBrands from '@/components/Admin/ManageBrands/ManageBrands'
import ManageSpecifications from '@/components/Admin/ManageSpecifications/ManageSpecifications'
import ManageProducts from '@/components/Admin/ManageProducts/ManageProducts'
import ManageUsers from '@/components/Admin/ManageUsers/ManageUsers'
import {
  FiGrid,
  FiInfo,
  FiList,
  FiPackage,
  FiTag,
  FiTruck,
  FiUsers
} from 'react-icons/fi'
import ManageOrders from '@/components/Admin/ManageOrders/ManageOrders'
import ManageShipping from '@/components/Admin/ManageShipping/ManageShipping'

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
    ico: <FiPackage />,
    linkName: 'Orders',
    path: 'manage_orders',
    page: <ManageOrders />
  },
  {
    ico: <FiTruck />,
    linkName: 'Shipping',
    path: 'manage_shipping',
    page: <ManageShipping />
  }
]
