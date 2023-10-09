import React from 'react'
import classes from "@/components/Admin/FormsStyles.module.css";
import ShippingCosts from "@/components/Admin/ManageShipping/ShippingCosts/ShippingCosts";

const ManageShipping = () => {
  return (
    <>
      <h1>MANAGE SHIPPING</h1>
        <div className={classes.formWithoutSidePreview}>
            <div className={classes.form}>
                <ShippingCosts />
            </div>
        </div>
    </>
  )
}

export default ManageShipping
