import classes from '@/components/Login/Login.module.css'
import Button from '@/components/UI/Button/Button'
import React, { useState } from 'react'
import { registrationFetch } from '@/http/user/auth'
import { useMessageStore } from '@/store/messageStore/messageStore'
import MessageString from '@/components/UI/MessageString/MessageString'
import AdminInput from '@/components/UI/AdminInputs/AdminInput/AdminInput'

const Register = ({ setLogOrRegSwitcher }) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    username: '',
    repeatPassword: ''
  })

  const { message, setMessage, setTemporaryMessage } = useMessageStore(
    (state) => ({
      message: state.message,
      setMessage: state.setMessage,
      setTemporaryMessage: state.setTemporaryMessage
    })
  )

  const register = async (event) => {
    event.preventDefault()
    try {
      if (input.password !== input.repeatPassword) {
        return setMessage({ ok: false, message: "Passwords don't match" })
      }
      const formData = new FormData(event.target)
      const data = await registrationFetch(formData)
      if (data.ok) {
        setTimeout(() => setLogOrRegSwitcher('signin'), 5000)
        setTemporaryMessage(data)
      } else if (!data.ok) {
        setMessage(data)
      } else {
        console.log(`Registration error`)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <h2 className={classes.h2}>Create a Buy This! Account</h2>
      <form onSubmit={register} className={classes.authForm} id={'register'}>
        <AdminInput
          type={'email'}
          name={'registration email'}
          label={'E-mail'}
          placeholder={'My-email@mail.com'}
          value={input.email}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, email: e.target.value })
          }}
        ></AdminInput>
        <AdminInput
          type={'text'}
          name={'registration username'}
          label={'Username'}
          placeholder={'Username...'}
          value={input.username}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, username: e.target.value })
          }}
        ></AdminInput>
        <AdminInput
          type={'password'}
          name={'registration password'}
          label={'Password'}
          placeholder={'Password...'}
          value={input.password}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, password: e.target.value })
          }}
        ></AdminInput>
        <AdminInput
          name={'repeat registration password'}
          label={'Repeat password'}
          placeholder={'Repeat password'}
          value={input.repeatPassword}
          onChange={(e) => {
            setMessage(null)
            setInput({ ...input, repeatPassword: e.target.value })
          }}
          type={'password'}
        ></AdminInput>
        <div className={classes.buttonWrapper}>
          <div
            className={classes.registerLink}
            onClick={() => {
              setMessage(null)
              setLogOrRegSwitcher('signin')
            }}
          >
            Already have an account?
          </div>
          <Button type={'submit'}>{'Register'}</Button>
        </div>
        {message && <MessageString message={message} maxWidth />}
      </form>
    </>
  )
}

export default Register
