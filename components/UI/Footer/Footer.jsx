import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
  const links = [
    { title: 'Our retail store' },
    { title: 'Affiliate Programme' },
    { title: 'Imprint' },
    { title: 'Data privacy' },
    { title: 'General Terms and Conditions' },
    { title: 'Battery return' },
    { title: 'Cookie settings' }
  ]
  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footer}>
        {links.map((el) => (
          <div to={'/'}>
            <p className={classes.footerText}>{el.title.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
