import React, { useEffect, useRef, useState } from 'react'
import AuthLayout from '../../common/AuthLayout/layout'
import styles from "./SendMoney.module.scss"
import EastIcon from '@mui/icons-material/East';
import { useSelector } from 'react-redux'
import {useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCapitalizeString } from '../../hooks';
import { CircularProgress } from '@mui/material';
import { toastifyConfig } from '../../utils/toastifyConfig';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const SendMoney = () => {
  const {user} = useSelector(state => state.loggedInUser)
  const navigate = useNavigate()
  const {username, userId} = useParams();
  const inputRef = useRef()

  const [reciever, setReciever] = useState({})
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const notify = (Message, error=false) => {
    if(error) {
      toast.error(Message, toastifyConfig);
    }
    else {
      toast.success(Message, toastifyConfig);
    }
  }

  useEffect(() => {
    if(!user.id) {
      return navigate("/")
    }

    (async function() {
      const recieverResponse = await axios.get(`https://paytm-payment-backend-1.onrender.com/api/v1/account/accountDetails/?userId=${userId}`)
      setReciever(recieverResponse)
    })()

    inputRef.current.focus()

  },[])


  const handleAmountInput = (e) => {
    const amountInput = e.target.value;
    if(!isNaN(amountInput)) {
      setAmount(amountInput)
    }
  }

  const handleSendMoney = async() => {
    try {
      setLoading(true)
      const dataPayload = {
        "recieverId": userId,
        "amount": parseInt(amount)
      };
      const token = Cookies.get("loggedInUser");
  
      // Use await to wait for the POST request to complete
      const response = await axios.post(
        `https://paytm-payment-backend-1.onrender.com/api/v1/account/transfer`,
        dataPayload, // Pass the dataPayload directly as the second argument
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setLoading(false)
      // Handle the response as needed
      console.log("Response data:", response.data);
      setAmount("")
      notify("Transaction Successfull")
      navigate("/")
  
      // Perform any additional actions after successful transfer
  
    } catch (error) {
      setLoading(false)
      setAmount("")
      notify("Transsaction Failed", true);
      navigate("/")
      console.log(`API Error: ${error}`);
      // Handle error gracefully
    }
  }

  return (
    <AuthLayout>
      <div className={styles.payment__container}>
        <h2 className={styles.payment__container__header}>Money Transfer</h2>
        <div className={styles.payment__container__transaction_info}>
          <span>{useCapitalizeString(user.firstname)}</span>
          <EastIcon style={{fontSize:"40px", color:"green"}}/>
          <span>{useCapitalizeString(username)}</span>
        </div>
        <div className={styles.payment__container__amount__container}>
        <span>Amount: $</span>
        <input value={amount} onChange={(e) => handleAmountInput(e)} ref={inputRef} type='text'/>
        </div>
        {
          loading ? (
            <CircularProgress style={{marginTop:"10px"}}/>
          ):(
            <button onClick={() => handleSendMoney()} className={styles.payment__container__send__button}>Send</button>
          )
        }
      </div>
    </AuthLayout>
  )
}

export default SendMoney