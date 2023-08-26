'use client'
import React from 'react'
import Button from '../../../UI/Button/Button'
import classes from '../SpecificationsForm.module.css'
import Input from '../../../UI/Input/Input'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const SpecificationsCreateForm = ({ setState, state, initialState }) => {
  const create = (e) => {
    e.preventDefault()
    const specification = {
      title: state.newSpecification.title,
      description: state.newSpecification.description,
      productId: state.newSpecification.productId
    }
    createSpecificationByPId(specification).then((r) => {
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
        <h1 className={classes.header}>CREATE NEW SPECIFICATION</h1>

        <form onSubmit={create}>
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
          <Input
            label={'title'}
            value={state.newSpecification.title}
            onChange={(e) =>
              setState({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  title: e.target.value
                }
              })
            }
          />
          <Input
            label={'description'}
            value={state.newSpecification.description}
            onChange={(e) =>
              setState({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  description: e.target.value
                }
              })
            }
          />
          <Button
            disabled={
              state.newSpecification.productId === '' ||
              state.newSpecification.description === '' ||
              state.newSpecification.title === ''
            }
          >
            Create specification
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SpecificationsCreateForm
