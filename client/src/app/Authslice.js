import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//sign up
export const Register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/user/register",
        userData,
      );

      return response;
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
      const response = await axios.post(`http://localhost:8081/user/login`, {
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

//get user
export const GetUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8081/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user",
      );
    }
  },
);

// Get Candidate Profile by UID
export const GetCandidateProfile = createAsyncThunk(
  "candidate/getProfile",
  async (uid, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `http://localhost:8082/candidate-profile/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch candidate profile",
      );
    }
  },
);

//update user
export const UpdateUser = createAsyncThunk(
  "user/update",
  async ({ uid, userData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(
        `http://localhost:8081/user/update/${uid}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user",
      );
    }
  },
);

//update candidate profile
export const UpdateCandidateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ uid, profileData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      console.log(uid);
      console.log(profileData);
      const response = await axios.put(
        `http://localhost:8082/candidate-profile/${uid}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user",
      );
    }
  },
);

//add resume
export const uploadResume = createAsyncThunk(
  "resume/uploadResume",
  async ({ cid, summary, isDefault, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const resume = {
        cid,
        summary,
        isDefault,
      };

      formData.append(
        "resume",
        new Blob([JSON.stringify(resume)], {
          type: "application/json",
        }),
      );

      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8082/api/candidate/resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Resume upload failed");
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
      })

      // Get User
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //candidate profile
      .addCase(GetCandidateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetCandidateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(GetCandidateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Support both formats: object with user field or plain user object
        if (action.payload && action.payload.user) {
          state.user = action.payload.user;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          state.user = action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Candidate Profile
      .addCase(UpdateCandidateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateCandidateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Update profile in redux state if API returns updated profile
        if (action.payload && action.payload.profile) {
          state.profile = action.payload.profile;
        }
      })
      .addCase(UpdateCandidateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
