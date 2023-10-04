'use client'

import classes from '@/components/Login/Login.module.css'
import Button from '@/components/UI/Button/Button'
import React, { useState } from 'react'
import { logFetch } from '@/http/user/auth'
import MessageString from '@/components/UI/MessageString/MessageString'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'
import { useRouter } from 'next/navigation'

const Signin = ({ setLogOrRegSwitcher, setAccountSwitcher }) => {
  const [input, setInput] = useState({ email: '', password: '' })

  const [message, setMessage] = useState(null)

  const router = useRouter()

  const signIn = async (e) => {
    try {
      e.preventDefault()
      const data = await logFetch(input)
      if (data.ok === true) {
        setAccountSwitcher(false)
        router.refresh()
      } else if (data.ok === false) {
        setMessage(data)
      } else {
        console.log(`login error`)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <h2 className={classes.h2}>Login to your account</h2>
      <form onSubmit={signIn} className={classes.authForm} id={'login'}>
        <AdminInput
          type={'email'}
          name={'login'}
          label={'E-mail'}
          placeholder={'My-email@mail.com'}
          value={input.email}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, email: e.target.value })
          }}
        ></AdminInput>
        <AdminInput
          type={'password'}
          name={'password'}
          label={'Password'}
          placeholder={'Password'}
          value={input.password}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, password: e.target.value })
          }}
        ></AdminInput>
        <div className={classes.buttonWrapper}>
          <div
            className={classes.registerLink}
            onClick={() => setLogOrRegSwitcher('register')}
          >
            Crete account
          </div>
          <Button>{'Log In'}</Button>
        </div>
        {message && <MessageString message={message} maxWidth />}
      </form>
    </>
  )
}

export default Signin
