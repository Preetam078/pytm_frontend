import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLoggedInUser = createAsyncThunk("fetchLoggedInUser", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`https://paytm-payment-backend-1.onrender.com/api/v1/user/signin`, payload);
        return response.data;
    } catch (error) {
        // If the request fails, reject with the error object
        return rejectWithValue(error.response.data);
    }
})


export const fetchSignUpUser = createAsyncThunk("fetchSignUpUser", async (payload, {rejectWithValue}) => {
    try {
        console.log("payload",payload)
        const response = await axios.post(`https://paytm-payment-backend-1.onrender.com/api/v1/user/signup`, payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})