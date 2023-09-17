import classes from '@/components/Login/Login.module.css'
import Input from '@/components/UI/Input/Input'
import Button from '@/components/UI/Button/Button'
import React, { useState } from 'react'
import { logFetch } from '@/http/auth'
import { useUserStore } from '@/store/mainStore/store'
import MessageString from '@/components/UI/MessageString/MessageString'

const Signin = ({ setLogOrRegSwitcher, setSideMenuSwitcher }) => {
  const [input, setInput] = useState({ email: '', password: '' })

  const { message, setMessage, setUser, setIsAuth } = useUserStore((state) => ({
    message: state.message,
    setMessage: state.setMessage,
    setUser: state.setUser,
    setIsAuth: state.setIsAuth
  }))

  const signIn = async (e) => {
    try {
      e.preventDefault()
      const data = await logFetch(input)
      if (data.ok === true) {
        setSideMenuSwitcher(false)
        setUser(data.dataObject)
        setIsAuth(true)
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
      <form onSubmit={signIn} className={classes.form} id={'login'}>
        <Input
          type={'email'}
          name={'login'}
          label={'E-mail'}
          placeholder={'My-email@mail.com'}
          value={input.email}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, email: e.target.value })
          }}
        ></Input>
        <Input
          type={'password'}
          name={'password'}
          label={'Password'}
          placeholder={'Password'}
          value={input.password}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, password: e.target.value })
          }}
        ></Input>
        <div className={classes.buttonWrapper}>
          <div
            className={classes.registerLink}
            onClick={() => setLogOrRegSwitcher('register')}
          >
            Crete account
          </div>
          <Button>{'Log In'}</Button>
        </div>
        {message && <MessageString message={message} />}
      </form>
    </>
  )
}

export default Signin
