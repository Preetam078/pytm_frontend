import React from 'react'
import styles from "./userInfo.module.scss"
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const {user} = useSelector((state) => state.loggedInUser)
  const balance = (user?.accountBalance) ? user.accountBalance.toFixed(2) : 0;
  return (
    <>
        <h3 className={styles.userInfo__container}>Your Account Balance: ${balance}</h3>
    </>
  )
}

export default UserInfo