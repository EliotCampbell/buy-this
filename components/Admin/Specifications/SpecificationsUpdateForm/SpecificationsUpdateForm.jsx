'use client'
import React from 'react'
import classes from '../SpecificationsForm.module.css'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'
import ReactSelect from '../../../UI/ReactSelect/ReactSelect'

const SpecificationsUpdateForm = ({ setState, state, initialState }) => {
  const update = (e) => {
    e.preventDefault()
    const specification = {
      title: state.newSpecification.title,
      description: state.newSpecification.description
    }
    updateSpecificationById(
      state.newSpecification.specificationId,
      specification
    ).then((r) => {
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
        <h1 className={classes.header}>UPDATE SPECIFICATION</h1>
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
        <form onSubmit={update}>
          <ReactSelect
            label={'Select specification'}
            options={state.specificationsList}
            onChange={(option) => {
              setState({
                ...state,
                newSpecification: {
                  ...state.newSpecification,
                  specificationId: option.value
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
          <Button>Update specification</Button>
        </form>
      </div>
    </div>
  )
}

export default SpecificationsUpdateForm
