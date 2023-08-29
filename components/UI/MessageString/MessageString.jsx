import classes from './MessageString.module.css'

const MessageString = ({ message }) =>
  message.ok ? (
    <p className={classes.messageString}>{message.message}</p>
  ) : (
    <p className={classes.errorMessageString}>{message.dataObject.error}</p>
  )

export default MessageString
