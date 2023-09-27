'use client'
import classes from './TopbarMessageString.module.css'
import { useMessageStore } from '@/store/messageStore/messageStore'

const TopbarMessageString = () => {
  const { data } = useMessageStore((state) => ({ data: state.topbarMessage }))

  data?.dataObject?.error &&
    console.log(data.dataObject.error + ` Sent from MessageString`)
  return data?.ok ? (
    <p className={classes.messageString}>{data?.message}</p>
  ) : (
    <p className={classes.errorMessageString}>{data?.message}</p>
  )
}

export default TopbarMessageString
