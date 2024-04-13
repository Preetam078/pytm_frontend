import { createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchSignUpUser } from "./loggedInUserApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const initialState= {
    user: {
        id:"",
        username: "",
        firstname: "", 
        lastname: "",
        accountId:"", 
        accountBalance:0
    },
    isLoading: false, 
    errorMessage: ""
}

export const LoggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState, 
    reducers: {
        setLoggedInUserData: (state, action) => {
            state.user.id = action?.payload?.userId
            state.user.firstname = action?.payload?.firstname
            state.user.lastname = action?.payload?.lastname
            state.user.username = action?.payload?.username
            state.user.accountId = action?.payload?.accountId
            state.user.accountBalance = action?.payload?.accountBalance
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(fetchLoggedInUser.pending, (state, action) => {
            state.isLoading = true;
            state.errorMessage = ""; 
        })
        builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
            Cookies.set('loggedInUser', action.payload.token, {expires: 1})
            const loggedInUserData = jwtDecode(action.payload.token)
            state.user.id = loggedInUserData?.userId
            state.user.username = loggedInUserData?.username
            state.user.firstname = loggedInUserData?.firstname
            state.user.lastname = loggedInUserData?.lastname
            state.user.accountId = loggedInUserData?.accountId 
            state.user.accountBalance = loggedInUserData?.accountBalance
            state.errorMessage = ""

            state.isLoading = false;
        })
        builder.addCase(fetchLoggedInUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage; 
        })

        builder.addCase(fetchSignUpUser.pending, (state, action) => {
            console.log("signup pending")
            state.isLoading = true;
            state.errorMessage = ""; 
        })
        builder.addCase(fetchSignUpUser.fulfilled, (state, action) => {
            console.log("signup sucesses", action)
            Cookies.set('loggedInUser', action.payload.token, {expires: 1})
            const loggedInUserData = jwtDecode(action.payload.token)
            state.user.id = loggedInUserData?.userId
            state.user.username = loggedInUserData?.username
            state.user.firstname = loggedInUserData?.firstname
            state.user.lastname = loggedInUserData?.lastname
            state.user.accountId = loggedInUserData?.accountId 
            state.user.accountBalance = loggedInUserData?.accountBalance
            state.errorMessage = ""

            state.isLoading = false;
        })
        builder.addCase(fetchSignUpUser.rejected, (state, action) => {
            console.log("signup rejected", action)
            state.isLoading = false;
            state.errorMessage = action.payload.errorMessage; 
        })
    }
})
export const{setLoggedInUserData} = LoggedInUserSlice.actions
export default LoggedInUserSlice.reducer