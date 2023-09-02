import React from 'react'
import { linksArr } from '@/app/admin/linksArr'
import classes from './page.module.css'

const AdministrationPage = ({ params }) => {
  const page = linksArr.find((el) => el.path === params.slug)

  return <div className={classes.inputs}>{page.page}</div>
}

export default AdministrationPage
