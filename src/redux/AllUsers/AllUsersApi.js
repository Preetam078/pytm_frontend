import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://paytm-payment-backend-1.onrender.com/api/v1/user/all/?filter=${payload}`);
        return response.data;
    } catch (error) {
        // If the request fails, reject with the error object
        return rejectWithValue(error.response.data);
    }
})

