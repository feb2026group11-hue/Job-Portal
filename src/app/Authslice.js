import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//sign up
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { profile, fullname, username, gender, password, confirmPassword },
    { rejectWithValue }
  ) => {
    const Base_Url = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.post(`${Base_Url}api/auth/signup`, {
        profile,
        fullname,
        username,
        gender,
        password,
        confirmPassword,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

//login
export const Login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    // const Base_Url = import.meta.env.VITE_BASE_URL;
    // const Base_Url =https://node-js-view-point.onrender.com/;

    try {
      const response = await axios.post(
        // `https://node-js-view-point.onrender.com/api/auth/login`,
        `http://localhost:9000/login`,
        {
          username:username,
          password:password,
        }
      );

      return {
        ...response.data,
        user: {
          ...response.data.user,
          email: username,
        },
      };
      // console.log(response);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      // Login
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;