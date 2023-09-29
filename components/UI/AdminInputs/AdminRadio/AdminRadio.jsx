import React from 'react'

const AdminRadio = ({ options = [], ...props }) => {
  return (
    <fieldset>
      <legend>Title</legend>
      {options.map((option) => (
        <>
          <input type={'radio'} id={option} {...props} />
          <label>{option}</label>
        </>
      ))}
    </fieldset>
  )
}

export default AdminRadio
