'use client'

import React, { useState } from 'react'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { useSessionStore, useUserStore } from '@/store/store'

const Login = ({ sideMenuSwitcher }) => {
  const [input, setInput] = useState({ email: '', password: '' })
  const [switcher, setSwitcher] = useState('auth')
  const [authMessage, setAuthMessage] = useState('')

  const logFetch = async (credentials) =>
    await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then((res) => res.json())

  const registrationFetch = async (credentials) =>
    await fetch('http://localhost:3000/api/user/registration', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then((res) => res.json())

  const signIn = async (e) => {
    try {
      e.preventDefault()
      if (switcher === 'auth') {
        const data = await logFetch(input)
        if (data.ok === true) {
          sideMenuSwitcher(false)
          useUserStore.setState({
            user: {
              id: data.dataObject.id,
              email: data.dataObject.email,
              role: data.dataObject.role
            }
          })
          useSessionStore.setState({
            token: data.dataObject.token,
            isAuth: true
          })
          console.log(
            'Login token is ' + data.dataObject.token + 'sent from Login.jsx'
          )
        } else if (data.ok === false) {
          setAuthMessage(data.message)
        } else {
          console.log(`login error`)
        }
      } else {
        const data = await registrationFetch(input)
        if (data.ok === true) {
          setSwitcher('auth')
        } else if (data.ok === false) {
          setAuthMessage(data.message)
        } else {
          console.log(`Registration error`)
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className={classes.login}>
      {switcher === 'auth' && (
        <>
          <h2 className={classes.h2}>Login to your account</h2>
        </>
      )}
      {switcher === 'register' && (
        <>
          <h2 className={classes.h2}>Create a Buy This! Account</h2>
        </>
      )}

      <form onSubmit={signIn} className={classes.form} id={'login'}>
        {switcher === 'auth' ? (
          <>
            <Input
              type={'email'}
              name={'username'}
              label={'E-mail'}
              placeholder={'my-email@mail.com'}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            ></Input>
            <Input
              name={'password'}
              label={'Password'}
              placeholder={'password'}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={'password'}
            ></Input>
            {authMessage !== '' && (
              <div className={classes.authMessage}>{authMessage}</div>
            )}
            <div className={classes.buttonWrapper}>
              <div
                className={classes.registerLink}
                onClick={() => setSwitcher('register')}
              >
                Crete account
              </div>
              <Button>{'Log In'}</Button>
            </div>
          </>
        ) : (
          <>
            {' '}
            <Input
              type={'email'}
              name={'login'}
              label={'E-mail'}
              placeholder={'my-email@mail.com'}
              value={input.email}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              type={'UserName'}
              name={'username'}
              label={'Username'}
              placeholder={'My Username'}
              value={input.email}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              name={'password'}
              label={'Password'}
              placeholder={'password'}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={'password'}
            ></Input>
            <Input
              name={'repeatPassword'}
              label={'Repeat password'}
              placeholder={'Repeat password'}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={'repeatPassword'}
            ></Input>
            {authMessage !== '' && (
              <div className={classes.authMessage}>{authMessage}</div>
            )}
            <div className={classes.buttonWrapper}>
              <div
                className={classes.registerLink}
                onClick={() => setSwitcher('auth')}
              >
                Already have an account?
              </div>
              <Button>{'Register'}</Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default Login
