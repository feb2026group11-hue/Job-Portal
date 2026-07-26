import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//sign up
export const Register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/register",
        userData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration Failed",
      );
    }
  },
);

//login
export const Login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    // const Base_Url = import.meta.env.VITE_BASE_URL;

    try {
      const response = await axios.post(`http://localhost:8080/user/login`, {
        email: username,
        password: password,
      });

      return {
        ...response.data,
        user: {
          ...response.data.user,
          email: username,
        },
      };
      // console.log(response);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
      localStorage.removeItem("isAuthenticated");
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
        console.log("FULFILLED:", action.payload);

        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action?.payload?.refresh);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(Register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
