import ManageCategories from '@/components/Admin/ManageCategories/ManageCategories'
import ManageBrands from '@/components/Admin/ManageBrands/ManageBrands'
import ProductCreateForm from '@/components/Admin/ManageProducts/ProductCreateForm/ProductCreateForm'
import SpecificationsCreateForm from '@/components/Admin/Specifications/SpecificationsCreateForm/SpecificationsCreateForm'
import SpecificationsUpdateForm from '@/components/Admin/Specifications/SpecificationsUpdateForm/SpecificationsUpdateForm'
import SpecificationsDeleteForm from '@/components/Admin/Specifications/SpecificationsDeleteForm/SpecificationsDeleteForm'
import React from 'react'
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
    linkName: 'Create specification',
    path: 'create_specification',
    page: <SpecificationsCreateForm />
  },
  {
    linkName: 'Update specification',
    path: 'update_specification',
    page: <SpecificationsUpdateForm />
  },
  {
    linkName: 'Delete specification',
    path: 'delete_specification',
    page: <SpecificationsDeleteForm />
  }
]
