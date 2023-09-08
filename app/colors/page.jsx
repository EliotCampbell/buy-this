import React from 'react'
import classes from './page.module.css'
import Color from '@/components/UI/Color/Color'

const Page = () => {
  return (
    <div className={classes.page}>
      <Color color={'#222222'}>#222222</Color>
      <Color color={'#333333'}>#333333 (MAIN)</Color>
      <Color color={'#444444'}>#444444</Color>
      <Color color={'#097171'}>#097171</Color>
      <Color color={'#008080'}>Teal (#008080)</Color>
      <Color color={'#00a6a6'}>#00A6A6</Color>
      <Color color={'#F2FAFA'}>#F2FAFA (HOVER)</Color>
      <Color color={'#dee1e7'}>#DEE1E7 (BORDER)</Color>
      <Color color={'#f1f1f1'}>#F1F1F1 (TEXT)</Color>
      <Color color={'#ffffff'}>White (#FFFFFF)</Color>
      <Color color={'#ff0000'}>Red (#FF0000)</Color>
      <Color color={'#008000'}>Green (#008000)</Color>
    </div>
  )
}

export default Page
