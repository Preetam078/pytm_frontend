import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./AllUsersApi";

const initialState = {
    users: [],
    isLoading: false, 
    errorMessage: ""
};

export const AllUserSlice = createSlice({
    name: "AllUsers",
    initialState, 
    reducers: {
        setUsersData: (state, action) => {
            state.users = action.payload;
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.isLoading = true;
                state.errorMessage = "";
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.isLoading = false;
                state.errorMessage = "";
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = "Internal Server error";
                state.users = [];
            });
    }
});

export const { setUsersData } = AllUserSlice.actions;
export default AllUserSlice.reducer;
