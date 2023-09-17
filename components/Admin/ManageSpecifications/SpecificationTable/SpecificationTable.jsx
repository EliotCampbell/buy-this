import React from 'react'
import classes from './SpecificationTable.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import SpecificationTableRow from '@/components/Admin/ManageSpecifications/SpecificationTable/SpecificationTableRow/SpecificationTableRow'
const SpecificationTable = () => {
  const { specificationsList } = useAdminListsStore((state) => ({
    specificationsList: state.specificationsList
  }))

  return (
    <div className={classes.table}>
      {specificationsList.map((specification) => (
        <SpecificationTableRow
          specification={specification}
          key={specification.value.id}
        />
      ))}
    </div>
  )
}

export default SpecificationTable
