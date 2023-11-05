import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000";

//!needed to change this to a function because token does not update upon login
const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    withCredentials: true,
  }
});

export const register = createAsyncThunk(
    "auth/register",
    async (form, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${url}/users`, form);
        return data;
      } catch (err) {
        const message = err?.response?.data?.message;
        if (message) return rejectWithValue(message);
      }
    }
  );
  
  export const login = createAsyncThunk(
    "auth/login",
    async (form, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${url}/auth`, form, config());
        if (response.status == 200) {
          const authorizationHeader = response.headers.get("Authorization");
          localStorage.setItem("Authorization", authorizationHeader);
          localStorage.setItem("profile", JSON.stringify(response.data.user));
        }
        return response.data;
      } catch (error) {
        const message = error?.response?.data?.message;
        if (message) return rejectWithValue(message);
      }
    }
  );