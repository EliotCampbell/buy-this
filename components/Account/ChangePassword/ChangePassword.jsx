'use client'
import React, { useState } from 'react'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import Button from '@/components/UI/Button/Button'
import { changePassword } from '@/http/user/changePassword'
import MessageString from '@/components/UI/MessageString/MessageString'

const ChangePassword = () => {
  const [message, setMessage] = useState(null)
  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    await changePassword(formData).then((data) => {
      setMessage(data)
      data.ok && setForm(defaultState)
    })
  }
  const defaultState = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  }
  const [form, setForm] = useState(defaultState)

  return (
    <>
      <p>Your password must have at least 8 characters.</p>
      <form onSubmit={(event) => submitHandler(event)}>
        <AdminInput
          name={'oldPassword'}
          label={'Old password'}
          type={'password'}
          value={form.oldPassword}
          onChange={(event) =>
            setForm({ ...form, oldPassword: event.target.value })
          }
        ></AdminInput>
        <AdminInput
          name={'newPassword'}
          label={'New password'}
          type={'password'}
          value={form.newPassword}
          onChange={(event) =>
            setForm({ ...form, newPassword: event.target.value })
          }
        ></AdminInput>
        <AdminInput
          name={'repeatNewPassword'}
          label={'Repeat new password'}
          type={'password'}
          value={form.repeatNewPassword}
          onChange={(event) =>
            setForm({ ...form, repeatNewPassword: event.target.value })
          }
        ></AdminInput>
        <MessageString message={message} />
        <Button>SAVE</Button>
      </form>
    </>
  )
}

export default ChangePassword
