import React, { useEffect } from 'react'
import DashboardLayout from '../../common/DashboardLayout/layout'
import Navbar from '../../components/Navbar/navbar'
import UserInfo from '../../components/UserInfo/userInfo'
import UserList from '../../components/UserList/userList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoggedInUserData } from '../../redux/loggedInUser/loggedInUserSlice'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const Dashboard = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if(!loggedInUser.user.username) {
      const loggedInUserToken = Cookies.get('loggedInUser')
      if(!loggedInUserToken) {
        navigate("/signin")
      }
      else {
        const tokenDecodedData = jwtDecode(loggedInUserToken)
        dispatch(setLoggedInUserData(tokenDecodedData))
      }
    }
  },[loggedInUser])

  return (
    <DashboardLayout>
      <Navbar/>
      <UserInfo/>
      <UserList/>

    </DashboardLayout>
  )
}

export default Dashboard