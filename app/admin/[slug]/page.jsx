import React from 'react'
import { linksArr } from '@/app/admin/linksArr'
import classes from './page.module.css'

const AdministrationPage = ({ params }) => {
  const page = linksArr.find((el) => el.path === params.slug)

  return page ? (
    <div className={classes.inputs}>{page.page}</div>
  ) : (
    <h1>No path</h1>
  )
}

export default AdministrationPage
