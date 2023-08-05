import React from 'react'
import { deleteSpecificationById } from '../../../../http/productsAPI'
import classes from '../SpecificationsForm.module.css'
import { observer } from 'mobx-react-lite'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'
import Specifications from '../../../Shop/ProductDetails/Specifications/Specifications'

const SpecificationsDeleteForm = observer(
  ({ setState, state, initialState }) => {
    const deleteSpecification = (id) => {
      deleteSpecificationById(id).then((r) => {
        if (r.ok) {
          setState({ ...initialState, message: r.message })
        } else {
          alert('Failed')
        }
      })
    }

    return (
      <div className={classes.specifications}>
        <div>
          <h1 className={classes.header}>DELETE SPECIFICATION</h1>

          <ReactSelect
            label={'Select product'}
            options={state.productsList}
            onChange={(option) => {
              setState({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  productId: option.value.id
                }
              })
            }}
          ></ReactSelect>
          <h1 className={classes.tableTitle}>Specifications:</h1>
          <Specifications deleteSpecification={deleteSpecification} />
        </div>
      </div>
    )
  }
)

export default SpecificationsDeleteForm
