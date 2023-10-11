'use client'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import Button from '@/components/UI/Button/Button'
import { createShippingCost } from '@/http/admin/shipping'
import React, { useState } from 'react'
import classes from './ShippingCosts.module.css'
import { useAdminListsStore } from '@/store/adminStore/adminListsStore'
import { FiTrash } from 'react-icons/fi'
const ShippingCosts = () => {
  const createShippingOptionHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    createShippingCost(formData).then()
  }

  const [newShippingOption, setNewShippingOption] = useState({
    country: null,
    shippingCost: null
  })

  const { shippingCostsList } = useAdminListsStore((state) => ({
    shippingCostsList: state.shippingCostsList,
    fetchShippingCostsList: state.fetchShippingCostsList
  }))

  return (
    <div>
      <form onSubmit={(event) => createShippingOptionHandler(event)}>
        <AdminInput
          name={'country'}
          label={'Shipping country'}
          placeholder={'Input shipping country...'}
          value={newShippingOption.country}
          onChange={(event) =>
            setNewShippingOption({
              ...newShippingOption,
              country: event.target.value
            })
          }
        />
        <AdminInput
          name={'shippingCost'}
          label={'Shipping cost'}
          placeholder={'Input shipping cost...'}
          value={newShippingOption.shippingCost}
          onChange={(event) =>
            setNewShippingOption({
              ...newShippingOption,
              shippingCost: event.target.value
            })
          }
        />
        <Button>CREATE SHIPPING OPTION</Button>
      </form>
      <div className={classes.listTitleRow}>
        <p className={classes.listTitleId}>ID</p>
        <p className={classes.listTitleCountry}>COUNTRY</p>
        <p className={classes.listTitleCity}>REGION</p>
        <p className={classes.listTitleArea}>AREA</p>
        <p className={classes.listTitleShippingCost}>SHIPPING COST</p>
      </div>
      {shippingCostsList.map((cost) => (
        <div className={classes.listRow} key={cost.value.id}>
          <p className={classes.listId}>{cost.value.id}</p>
          <p className={classes.listCountry}>{cost.value.country}</p>
          <p className={classes.listCity}>{cost.value.city}</p>
          <p className={classes.listArea}> {cost.value.area}</p>
          <p className={classes.listShippingCost}>
            {`${Number.parseFloat(cost.value.shippingCost).toFixed(2)} €`}
          </p>
          <FiTrash className={classes.removeIco} onClick={() => {}} />
        </div>
      ))}
    </div>
  )
}

export default ShippingCosts
