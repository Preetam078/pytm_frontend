import React, { useEffect, useState } from "react";
import AuthLayout from "../../common/AuthLayout/layout";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./Signin.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUser } from "../../redux/loggedInUser/loggedInUserApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { toastifyConfig } from "../../utils/toastifyConfig";
import Cookies from "js-cookie";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

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
      notify("Loggedin successfully", false)
      navigate("/");
    }
    else{
      const loggedInUserToken = Cookies.get('loggedInUser')
      if(!loggedInUserToken) {
        navigate("/signin")
      }
      else {
        navigate("/");
      }
    }
  }, [loggedInUser]);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `https://paytm-payment-backend-1.onrender.com/api/v1/user/signin`
    );
    // Handle sign in logic here
    console.log(formData);
    await dispatch(fetchLoggedInUser(formData));
    console.log(loggedInUser);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <div className={styles.signin__container}>
        <h1>Sign In</h1>
        <span className={styles.signin__container__agenda}>
          Enter your credentials to access your account
        </span>
        <form onSubmit={(e) => handleSignInSubmit(e)}>
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
            <span>Password</span>
            <div
              style={{ display: "flex" }}
              className={styles.signin__container__input__container__inputBox}
            >
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
              />
              <div style={{ cursor: "pointer" }} onClick={handleShowPassword}>
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
              Sign In
            </button>
          )}
        </form>
        <div className={styles.signin__container__link}>
          <span>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signin;
