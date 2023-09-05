import classes from './MessageString.module.css'

const MessageString = ({ message }) =>
  message.ok ? (
    <p className={classes.messageString}>{message.message}</p>
  ) : (
    <p className={classes.errorMessageString}>{message.message}</p>
  )

export default MessageString
