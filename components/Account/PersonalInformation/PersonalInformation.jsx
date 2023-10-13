'use client'
import React, { useState } from 'react'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import Button from '@/components/UI/Button/Button'
import { patchPersonalData } from '@/http/user/personalData'

const PersonalInformation = ({ userInfo = null }) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    await patchPersonalData(formData)
  }
  const [form, setForm] = useState({
    email: userInfo.email,
    address: userInfo.address,
    postalCode: userInfo.postalCode,
    country: userInfo.country,
    phoneNumber: userInfo.phoneNumber
  })
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <AdminInput
        disabled={true}
        value={form.email}
        label={'Your email address'}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
      />
      <AdminInput
        value={form.address}
        label={'Your address'}
        name={'address'}
        onChange={(event) => setForm({ ...form, address: event.target.value })}
      />
      <AdminInput
        value={form.postalCode}
        label={'Your postal code'}
        name={'postalCode'}
        onChange={(event) =>
          setForm({ ...form, postalCode: event.target.value })
        }
      />
      <AdminInput
        value={form.city}
        label={'Your city'}
        name={'city'}
        onChange={(event) => setForm({ ...form, city: event.target.value })}
      />
      <AdminInput
        value={form.country}
        label={'Your country'}
        name={'country'}
        onChange={(event) => setForm({ ...form, country: event.target.value })}
      />
      <AdminInput
        value={form.phoneNumber}
        label={'Your phone number'}
        name={'phoneNumber'}
        onChange={(event) =>
          setForm({ ...form, phoneNumber: event.target.value })
        }
      />
      <Button>SAVE</Button>
    </form>
  )
}

export default PersonalInformation
