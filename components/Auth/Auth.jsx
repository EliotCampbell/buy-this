'use client'

import React, { useState } from 'react'
import classes from './Auth.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { NextResponse } from 'next/server'

const Auth = ({ sideMenuSwitcher }) => {
  const [input, setInput] = useState({ username: '', password: '' })
  const [switcher, setSwitcher] = useState('auth')
  const router = useRouter()
  const callbackUrl = useSearchParams().get('callbackUrl') || '/'

  const log = async (e) => {
    try {
      e.preventDefault()
      if (switcher === 'auth') {
        await signIn('credentials', {
          email: input.username,
          password: input.password,
          redirect: false
        })
        // sideMenuSwitcher(false)
        // router.push('/')
      } else await regisration(input.username, input.password)
    } catch (e) {
      alert(e.message)
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

      <form onSubmit={log} className={classes.form} id={'login'}>
        {switcher === 'auth' ? (
          <>
            <Input
              type={'email'}
              name={'username'}
              label={'E-mail'}
              placeholder={'my-email@mail.com'}
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              name={'password'}
              label={'Password'}
              placeholder={'password'}
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type={'password'}
            ></Input>{' '}
            <div className={classes.buttonWrapper}>
              <div
                className={classes.registerLink}
                onClick={() => setSwitcher('register')}
              >
                Crete account
              </div>
              <Button>{'Log In'}</Button>
              <Button onClick={() => signIn('google', { callbackUrl })}>
                {'Log In with Google'}
              </Button>
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
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            ></Input>
            <Input
              type={'UserName'}
              name={'username'}
              label={'Username'}
              placeholder={'My Username'}
              value={input.username}
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

export default Auth
