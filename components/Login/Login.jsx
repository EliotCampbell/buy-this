'use client'

import React, { useState } from 'react'
import classes from './Login.module.css'
import Signin from '@/components/Login/Signin/Signin'
import Register from '@/components/Login/Register/Register'

const Login = ({ setAccountSwitcher }) => {
  const [logOrRegSwitcher, setLogOrRegSwitcher] = useState('signin')

  return (
    <div className={classes.login}>
      {logOrRegSwitcher === 'signin' ? (
        <Signin
          setLogOrRegSwitcher={setLogOrRegSwitcher}
          setAccountSwitcher={setAccountSwitcher}
        />
      ) : (
        <Register setLogOrRegSwitcher={setLogOrRegSwitcher} />
      )}
    </div>
  )
}

export default Login
