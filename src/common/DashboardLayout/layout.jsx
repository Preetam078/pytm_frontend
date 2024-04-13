import React from 'react'
import styles from "./dashboardLayout.module.scss"

const DashboardLayout = ({children}) => {
  return (
    <div className={styles.dashboardLayout__container}>
        {children}
    </div>
  )
}

export default DashboardLayout