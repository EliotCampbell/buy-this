import React from 'react'
import classes from './ReactSelect.module.css'
import Select from 'react-select'

const ReactSelect = ({ options, label, ...props }) => {
  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderRadius: '1px',
      borderColor: 'teal',
      minHeight: '40px',
      boxShadow: 'none',
      '&:hover': {
        border: 'teal solid 1px'
      }
    }),
    container: (baseStyles) => ({
      ...baseStyles,
      color: 'teal',
      fontFamily: 'BlenderPro-Bold',
      fontSize: '18px'
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      border: ' solid 1px teal',
      borderRadius: '1px',
      zIndex: '999'
    }),
    menuList: (baseStyles) => ({
      ...baseStyles
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: 'teal'
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      height: '35px',
      paddingLeft: '10px',
      '&:hover': {
        backgroundColor: !state.isSelected && '#f2fafa',
        cursor: 'pointer'
      },
      '&:focus': {
        backgroundColor: '#c23030'
      },
      backgroundColor: state.isSelected ? 'teal' : 'white',
      color: state.isSelected ? 'white' : 'teal'
    }),
    indicators: (baseStyles) => ({
      ...baseStyles,
      zIndex: '1'
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'teal',
      color: '#f1f1f1'
    }),
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: '#f1f1f1'
    }),
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      '&:hover': {
        backgroundColor: 'teal',
        color: '#f1f1f1',
        cursor: 'pointer'
      }
    }),
    dropdownIndicator: () => ({
      height: '36px',
      width: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'teal',
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    clearIndicator: () => ({
      height: '36px',
      width: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'teal',
      '&:hover': {
        cursor: 'pointer'
      }
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'teal'
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      paddingTop: '6px'
    })
  }

  return (
    <div className={classes.div}>
      <label className={classes.label}>{label}</label>
      <Select styles={selectStyles} options={options} {...props}></Select>
    </div>
  )
}

export default ReactSelect
