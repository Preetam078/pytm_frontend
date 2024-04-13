import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "../../common/AuthLayout/layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./signup.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUpUser } from "../../redux/loggedInUser/loggedInUserApi";
import { toastifyConfig } from "../../utils/toastifyConfig";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import {Box} from "@mui/material";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const passwordInputRef = useRef();

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const notify = (Message, error=false) => {
    if(error) {
      toast.error(Message, toastifyConfig);
    }
    else {
      toast.success(Message, toastifyConfig);
    }
  }

  useEffect(() => {
    if(loggedInUser.errorMessage) {
      notify(loggedInUser.errorMessage, true)
    }
    
    if(loggedInUser.user.username) {
      notify("signedup successfully", false)
      navigate("/");
    }
    else{
      const loggedInUserToken = Cookies.get('loggedInUser')
      if(!loggedInUserToken) {
        navigate("/signup")
      }
      else {
        navigate("/");
      }
    }
  }, [loggedInUser]);

  const handleSignUpSubmit = async(e) => {
    e.preventDefault();
    console.log("hello button")
    await dispatch(fetchSignUpUser(formData))
  };

  const handleShowPassword = () => {
    if (!showPassword) {
      passwordInputRef.current.type = "text";
    } else {
      passwordInputRef.current.type = "password";
    }
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <div className={styles.signin__container}>
        <h1>Sign Up</h1>
        <span className={styles.signin__container__agenda}>
          Enter your credentials to access your account
        </span>
        <form onSubmit={(e) => handleSignUpSubmit(e)}>
          <div className={styles.signin__container__input__container}>
            <span>Username</span>
            <div
              className={styles.signin__container__input__container__inputBox}
            >
              <input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                type="text"
                placeholder="enter your username"
              />
            </div>
          </div>
          <div className={styles.signin__container__input__container}>
            <span>Firstname</span>
            <div
              className={styles.signin__container__input__container__inputBox}
            >
              <input
               value={formData.firstname}
               onChange={(e) => setFormData({...formData, firstname:e.target.value})}
               type="text" 
               placeholder="enter your firstname" />
            </div>
          </div>
          <div className={styles.signin__container__input__container}>
            <span>Lastname</span>
            <div
              className={styles.signin__container__input__container__inputBox}
            >
              <input 
              value={formData.lastname}
              onChange={(e) => {setFormData({...formData, lastname:e.target.value})}}
              type="text" 
              placeholder="enter your lastname" />
            </div>
          </div>
          <div className={styles.signin__container__input__container}>
            <span>Password</span>
            <div
              style={{ display: "flex" }}
              className={styles.signin__container__input__container__inputBox}
            >
              <input
                value={formData.password}
                onChange={(e) => {setFormData({...formData, password:e.target.value})}}
                ref={passwordInputRef}
                type="password"
                placeholder="enter your password"
              />
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleShowPassword()}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>
          </div>
          {loggedInUser.isLoading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: "30px"}}
            >
              <CircularProgress />
            </Box>
          ) : (
            <button type="submit" className={styles.signin__container__button}>
              Sign Up
            </button>
          )}
        </form>
        <div className={styles.signin__container__link}>
          <span>
            Already have an account? <Link to="/signin">Sign In</Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
