import classes from '@/components/Login/Login.module.css'
import Input from '@/components/UI/Input/Input'
import Button from '@/components/UI/Button/Button'
import React, { useState } from 'react'
import { logFetch } from '@/http/auth'
import { useSessionStore, useUserStore } from '@/store/mainStore/store'
import MessageString from '@/components/UI/MessageString/MessageString'

const Signin = ({ setLogOrRegSwitcher, setSideMenuSwitcher }) => {
  const [input, setInput] = useState({ email: '', password: '' })

  const { message, setMessage } = useUserStore((state) => ({
    message: state.message,
    setMessage: state.setMessage
  }))

  const signIn = async (e) => {
    try {
      e.preventDefault()
      const data = await logFetch(input)
      if (data.ok === true) {
        setSideMenuSwitcher(false)
        useUserStore.setState({
          user: {
            id: data.dataObject.id,
            email: data.dataObject.email,
            username: data.dataObject.username,
            role: data.dataObject.role
          }
        })
        useSessionStore.setState({
          token: data.dataObject.token,
          isAuth: true
        })
        console.log(
          'Login token is\n\n' +
            data.dataObject.token +
            '\n\nsent from Login.jsx'
        )
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
          name={'email'}
          label={'E-mail'}
          placeholder={'my-email@mail.com'}
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
          placeholder={'password'}
          value={input.password}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, password: e.target.value })
          }}
        ></Input>
        {message && <MessageString message={message} />}
        <div className={classes.buttonWrapper}>
          <div
            className={classes.registerLink}
            onClick={() => setLogOrRegSwitcher('register')}
          >
            Crete account
          </div>
          <Button>{'Log In'}</Button>
        </div>
      </form>
    </>
  )
}

export default Signin
