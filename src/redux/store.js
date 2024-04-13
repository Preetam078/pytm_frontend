import { configureStore } from "@reduxjs/toolkit";
import loggedInUserSlice from "./loggedInUser/loggedInUserSlice";
import  AllUserSlice  from "./AllUsers/AllUsersSlice";

export const store = configureStore({
    reducer:{
        loggedInUser: loggedInUserSlice,
        allUsers: AllUserSlice
    },
})