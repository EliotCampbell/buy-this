import classes from './MessageString.module.css'

const MessageString = ({ message, setMessage, maxWidth = false }) => {
  message?.dataObject?.error &&
    console.log(
      message.dataObject.error + ` Full error\n Sent from MessageString`
    )
  message?.ok && setMessage && setTimeout(() => setMessage(null), 5000)
  return message ? (
    message.ok ? (
      <p
        className={
          maxWidth ? classes.messageStringMaxWidth : classes.messageString
        }
        title={message.message}
      >
        {message.message}
      </p>
    ) : (
      <p
        className={
          maxWidth
            ? classes.errorMessageStringMaxWidth
            : classes.errorMessageString
        }
        title={message.message}
      >
        {message.message}
      </p>
    )
  ) : (
    <p></p>
  )
}

export default MessageString
