import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SignUpData } from '../interfaces/postData';

export const submitLogin = createAsyncThunk('authSlice/submitLogin', async (values: { email: string, password: string }) => {
  return await axios.post(`https://linked-posts.routemisr.com/users/signin`, values)
    .then((response) => response)
    .catch((error) => error);
});

export const submitSignUp = createAsyncThunk('auth/submitSignUp', async (values: SignUpData) => {
  return await axios.post('https://linked-posts.routemisr.com/users/signup', values)
    .then((response) => response)
    .catch((error) => error);
});

const initialState: { userToken: null | string, userData: null | string, isLoading: boolean, isError: boolean } = {
  userToken: null,
  userData: null,
  isLoading: false,
  isError: false,
};


if (typeof window !== "undefined") {
  initialState.userToken = localStorage.getItem('userToken');
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.userToken = null;
      localStorage.removeItem('userToken');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitSignUp.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(submitSignUp.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;

    });
    builder.addCase(submitSignUp.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(submitLogin.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(submitLogin.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.userToken = action?.payload?.data?.token;
      localStorage.setItem('userToken', action?.payload?.data?.token);
      console.log(action?.payload);
    });
    builder.addCase(submitLogin.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  }
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
