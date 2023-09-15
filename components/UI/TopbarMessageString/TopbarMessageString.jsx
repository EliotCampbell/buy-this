'use client'
import classes from './TopbarMessageString.module.css'
import { useUserStore } from '@/store/mainStore/store'

const TopbarMessageString = () => {
  const { data } = useUserStore((state) => ({ data: state.topbarMessage }))

  data?.dataObject?.error &&
    console.log(data.dataObject.error + ` Sent from MessageString`)
  return data?.ok ? (
    <p className={classes.messageString}>{data?.message}</p>
  ) : (
    <p className={classes.errorMessageString}>{data?.message}</p>
  )
}

export default TopbarMessageString
