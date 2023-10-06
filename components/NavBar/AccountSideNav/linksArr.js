import ManageCategories from '@/components/Admin/ManageCategories/ManageCategories'
import ManageBrands from '@/components/Admin/ManageBrands/ManageBrands'
import ManageSpecifications from '@/components/Admin/ManageSpecifications/ManageSpecifications'
import ManageProducts from '@/components/Admin/ManageProducts/ManageProducts'
import ManageUsers from '@/components/Admin/ManageUsers/ManageUsers'
import { FiFileText, FiLock, FiPackage, FiSend, FiUser } from 'react-icons/fi'

export const linksArr = [
  {
    ico: <FiUser />,
    linkName: 'Account',
    path: '',
    page: <ManageCategories />
  },
  {
    ico: <FiPackage />,
    linkName: 'Orders',
    path: '',
    page: <ManageBrands />
  },
  {
    ico: <FiSend />,
    linkName: 'Address',
    path: '',
    page: <ManageProducts />
  },
  {
    ico: <FiFileText />,
    linkName: 'Personal information',
    path: '',
    page: <ManageSpecifications />
  },
  {
    ico: <FiLock />,
    linkName: 'Password',
    path: '',
    page: <ManageUsers />
  }
]
