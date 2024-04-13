import React, { useEffect, useState } from "react";
import styles from "./userList.module.scss";
import { Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { toastifyConfig } from "../../utils/toastifyConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/AllUsers/AllUsersApi";
import { useNavigate } from "react-router-dom";
import { useCapitalizeString } from "../../hooks";

const UserList = () => {
  const notify = () => toast.success("Success notification!", toastifyConfig);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState("")
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchAllUsers(searchString));
      } catch (error) {
        console.error("Error fetching all user data:", error);
      }
    };

    fetchData();
  }, [searchString]);

  //input optimisation
  const debounce = (func, delay) => {
    let timer; 
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() =>{
        func.apply(this, args)
      }, delay)
    }
  }
  
  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
    debounce(setSearchString, 500)(inputValue)
  }

  const handleSendMoney = (name, senderId) =>{
    console.log("sending money", senderId)
    navigate(`/send/${name}/${senderId}`)
  }

  return (
    <>
      <span className={styles.userList__heading}>Users</span>
      <div className={styles.userList__inputBox}>
        <input type="text" value={inputValue} onChange={(e) => handleSearchInput(e)} placeholder="search user" />
      </div>
      <div>
        {users.map((user, index) => (
          <div key={user.id} className={styles.userList__container}>
            <div className={styles.userList__container__leftSideInfo}>
              <Avatar>{user.firstname[0].toUpperCase()}</Avatar>
              <span>{useCapitalizeString(user.firstname)}</span>
            </div>
            <button onClick={()=>handleSendMoney(user.firstname,user.id)}>Send Money</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
