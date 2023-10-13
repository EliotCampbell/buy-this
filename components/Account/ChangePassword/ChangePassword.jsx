'use client'
import React from 'react'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'

const ChangePassword = () => {
  return (
    <>
      <p>Your password must have at least 8 characters.</p>
      <AdminInput
        placeholder={'Old password...'}
        type={'password'}
      ></AdminInput>
      <AdminInput
        placeholder={'New password...'}
        type={'password'}
      ></AdminInput>
      <AdminInput
        placeholder={'Repeat new password...'}
        type={'password'}
      ></AdminInput>
    </>
  )
}

export default ChangePassword
