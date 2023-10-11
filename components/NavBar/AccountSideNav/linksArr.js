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
    path: '/account'
  },
  {
    ico: <FiPackage />,
    linkName: 'Orders',
    path: ''
  },
  {
    ico: <FiSend />,
    linkName: 'Address',
    path: ''
  },
  {
    ico: <FiFileText />,
    linkName: 'Personal information',
    path: ''
  },
  {
    ico: <FiLock />,
    linkName: 'Password',
    path: ''
  }
]
