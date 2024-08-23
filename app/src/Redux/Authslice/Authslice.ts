"use client";
import { axiosInstance } from "@/Axios/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  userdata: any;
  token: string | null;
  isLogin: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  userdata: null,
  token: null,
  isLogin: false,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      return { token, user };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(`auth/register`, {
        email,
        password,
        name,
      });
      const { token } = response.data;
      return { token };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    console.log(token);

    try {
      const response = await axiosInstance.get(`auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.userdata = null;
      state.token = null;
      state.isLogin = false;
      localStorage.setItem("token", "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isLogin = true;
        localStorage.setItem("token", action.payload.token as string);
        state.userdata = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userdata = action.payload;
        state.isLogin = true;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
