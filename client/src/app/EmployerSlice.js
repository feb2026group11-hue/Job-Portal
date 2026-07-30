import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch employer profile by user ID
export const getEmployerProfile = createAsyncThunk(
    "employer/getEmployerProfile",
    async (userId, { rejectWithValue, getState }) => {
        try {
            const targetId = typeof userId === "object" ? (userId.userId || userId.uid) : userId;
            const token = getState().auth?.token || localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await axios.get(
                `http://localhost:8085/api/employers/user/${targetId}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Failed to fetch employer profile"
            );
        }
    }
);

// Update employer profile
export const updateEmployerProfile = createAsyncThunk(
    "employer/updateEmployerProfile",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const employerId = payload.employerId || payload.id;
            const profileData = payload.profileData || payload;

            const token = getState().auth?.token || localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await axios.put(
                `http://localhost:8085/api/employers/${employerId}`,
                profileData,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Failed to update employer profile"
            );
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    "employer/updateUser",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const uid = payload.uid || payload.userId;
            const userData = payload.userData || payload;

            const token = getState().auth?.token || localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await axios.put(
                `http://localhost:8081/user/${uid}`,
                userData,
                { headers }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Failed to update user"
            );
        }
    }
);

const initialState = {
    profile: null,
    loading: false,
    error: null,
    success: false,
};

const employerSlice = createSlice({
    name: "employer",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
        },
        clearProfile: (state) => {
            state.profile = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // getEmployerProfile
            .addCase(getEmployerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEmployerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.error = null;
            })
            .addCase(getEmployerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateEmployerProfile
            .addCase(updateEmployerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateEmployerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.success = true;
                state.error = null;
            })
            .addCase(updateEmployerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // updateUser
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearError, resetSuccess, clearProfile } = employerSlice.actions;

export default employerSlice.reducer;
