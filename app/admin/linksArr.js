import CategoryCreateForm from '@/components/Admin/Categories/CategoryCreateForm/CategoryCreateForm'
import CategoryUpdateForm from '@/components/Admin/Categories/CategoryUpdateForm/CategoryUpdateForm'
import CategoryDeleteForm from '@/components/Admin/Categories/CategoryDeleteForm/CategoryDeleteForm'
import BrandCreateForm from '@/components/Admin/Brands/BrandCreateForm/BrandCreateForm'
import BrandUpdateForm from '@/components/Admin/Brands/BrandUpdateForm/BrandUpdateForm'
import BrandDeleteForm from '@/components/Admin/Brands/BrandDeleteForm/BrandDeleteForm'
import ProductCreateForm from '@/components/Admin/Products/ProductCreateForm/ProductCreateForm'
import ProductUpdateForm from '@/components/Admin/Products/ProductUpdateForm/ProductUpdateForm'
import ProductDeleteForm from '@/components/Admin/Products/ProductDeleteForm/ProductDeleteForm'
import SpecificationsCreateForm from '@/components/Admin/Specifications/SpecificationsCreateForm/SpecificationsCreateForm'
import SpecificationsUpdateForm from '@/components/Admin/Specifications/SpecificationsUpdateForm/SpecificationsUpdateForm'
import SpecificationsDeleteForm from '@/components/Admin/Specifications/SpecificationsDeleteForm/SpecificationsDeleteForm'
import React from 'react'

export const linksArr = [
  { title: 'Categories' },
  {
    linkName: 'Create category',
    path: 'create_category',
    page: <CategoryCreateForm />
  },
  {
    linkName: 'Update category',
    path: 'update_category',
    page: <CategoryUpdateForm />
  },
  {
    linkName: 'Delete category',
    path: 'delete_category',
    page: <CategoryDeleteForm />
  },
  { title: 'Brands' },
  {
    linkName: 'Create brand',
    path: 'create_brand',
    page: <BrandCreateForm />
  },
  {
    linkName: 'Update brand',
    path: 'update_brand',
    page: <BrandUpdateForm />
  },
  {
    linkName: 'Delete brand',
    path: 'delete_brand',
    page: <BrandDeleteForm />
  },
  { title: 'Products' },
  {
    linkName: 'Create product',
    path: 'create_product',
    page: <ProductCreateForm />
  },
  {
    linkName: 'Update product',
    path: 'update_product',
    page: <ProductUpdateForm />
  },
  {
    linkName: 'Delete product',
    path: 'delete_product',
    page: <ProductDeleteForm />
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
