import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCandidateProfile } from "./Authslice";
import axios from "axios";

//get resume
export const getResume = createAsyncThunk(
  "resume/getResume",
  async (cid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:8082/api/candidate/resume/candidate/${cid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const candidateProfileSlice = createSlice({
  name: "candidateProfile",
  initialState,
  reducers: {
    setCandidateProfile: (state, action) => {
      state.profile = action.payload;
    },

    clearCandidateProfile: (state) => {
      state.profile = null;
    },
  },

  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const {
  setCandidateProfile,
  clearCandidateProfile,
} = candidateProfileSlice.actions;

export default candidateProfileSlice.reducer;