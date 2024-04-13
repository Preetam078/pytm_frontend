import React from 'react'
import styles from "./navbar.module.scss"
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { useCapitalizeString } from '../../hooks'

const Navbar= () => {
  const {user} = useSelector(state => state.loggedInUser)
  const letter = (user?.firstname && user.firstname[0]) ? user.firstname[0].toUpperCase() : '';
  return (
    <div className={styles.navbar__container}>
        <h2>Payment App</h2>
        <div className={styles.navbar__container__userinfo}>
            <span>Hello, {useCapitalizeString(user.firstname)}</span>
            <Avatar>{letter}</Avatar>
        </div>
    </div>
  )
}

export default Navbar