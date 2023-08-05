import React from 'react'
import { authRoutes, publicRoutes } from '../../../routes'
import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import classes from './AppRouter.module.css'

const AppRouter = observer(() => {
  const role = localStorage.getItem('role')

  return (
    <div className={classes.body}>
      {role === 'ADMIN' ? (
        <Routes>
          {authRoutes.map((el) => (
            <Route key={el.path} path={el.path} element={el.page} exact />
          ))}
          {publicRoutes.map((el) => (
            <Route key={el.path} path={el.path} element={el.page} exact />
          ))}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((el) => (
            <Route key={el.path} path={el.path} element={el.page} exact />
          ))}
        </Routes>
      )}
    </div>
  )
})

export default AppRouter
