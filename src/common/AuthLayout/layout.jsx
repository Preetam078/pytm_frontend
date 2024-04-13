import React from 'react'
import styles from "./auth.module.scss"

const AuthLayout = ({children}) => {
  return (
    <div className={styles.authContainer}>
      {children}
    </div>
  )
}

export default AuthLayout