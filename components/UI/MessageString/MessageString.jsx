import classes from './MessageString.module.css'

const MessageString = ({ message }) => {
  message.dataObject?.error &&
    console.log(message.dataObject.error + ` Sent from MessageString`)
  return message.ok ? (
    <p className={classes.messageString}>{message.message}</p>
  ) : (
    <p className={classes.errorMessageString}>{message.message}</p>
  )
}

export default MessageString
