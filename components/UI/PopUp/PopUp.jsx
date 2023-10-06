import React from 'react'
import classes from './PopUp.module.css'
import Button from '@/components/UI/Button/Button'
import { FiCheck, FiX } from 'react-icons/fi'
import Link from 'next/link'

const PopUp = ({ message, setMessage }) => {
  return (
    <div
      className={classes.popUpBackground}
      onClick={() => {
        setMessage(null)
      }}
    >
      <div
        className={classes.popUp}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <div className={classes.topSection}>
          <div className={classes.message}>
            {!message.ok && <FiX className={classes.messageError} />}
            {message.ok && <FiCheck className={classes.messageOk} />}
            <h2>{message.message}</h2>
          </div>
          <FiX
            className={classes.x}
            onClick={() => {
              setMessage(null)
            }}
          />
        </div>
        {message.ok && (
          <div className={classes.content}>
            <div className={classes.buttonWrapper}>
              <Button style={'light'} onClick={() => setMessage(null)}>
                CONTINUE SHOPPING
              </Button>
            </div>
            <div className={classes.buttonWrapper}>
              <Link href={'/cart'}>
                <Button>ORDER NOW</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PopUp
