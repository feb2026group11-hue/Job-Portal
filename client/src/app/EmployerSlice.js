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

//create jon api call
export const createJob = createAsyncThunk(
    "job/createJob",
    async (jobData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8083/api/jobs",
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to create job"
            );
        }
    }
);

//jobs api
export const getEmployerJobs = createAsyncThunk(
    "employer/getEmployerJobs",
    async (empid, { rejectWithValue }) => {
        // console.log("empid:", empid);
        try {
            const token = localStorage.getItem("token");
            console.log("empid:", empid);
            const res = await axios.get(
                `http://localhost:8083/api/jobs/employer/${empid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;
        } catch (err) {
            // return rejectWithValue(
            return err.response?.data?.message || "Failed to fetch jobs"
            // );
        }
    }
);

//update job
export const updateJob = createAsyncThunk(
    "employer/updateJob",
    async ({ jobId, jobData }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));

            const res = await axios.put(
                `http://localhost:8083/api/jobs/${jobId}`,
                jobData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update job"
            );
        }
    }
);

//delete job
export const deleteJob = createAsyncThunk(
    "employer/deleteJob",
    async (jobId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:8083/api/jobs/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return jobId;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to delete job"
            );
        }
    }
);

//for job status
export const updateJobStatus = createAsyncThunk(
    "employer/updateJobStatus",
    async ({ jobId, status }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `http://localhost:8083/api/jobs/${jobId}/status`,
                null,
                {
                    params: { status },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update job status"
            );
        }
    }
);

//get all appli for jobs
export const getApplicationsByJob = createAsyncThunk(
    "employer/getApplicationsByJob",
    async (jobId, { rejectWithValue }) => {
        console.log(jobId)
        try {
            console.log(jobId)
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:8083/api/applications/job/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;

        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch applications"
            );
        }
    }
);

//update appli status
export const updateApplicationStatus = createAsyncThunk(
    "employer/updateApplicationStatus",
    async ({ applicationId, statusId }, { rejectWithValue }) => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.put(
                `http://localhost:8083/api/applications/${applicationId}/status/${statusId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;

        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to update status"
            );
        }
    }
);

//get candidate by cid
export const getCandidateByCid = createAsyncThunk(
    "employer/getCandidateByCid",
    async (cid, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8082/candidate-profile/cid/${cid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch candidate profile"
            );
        }
    }
);

//get user by uid
export const getUserById = createAsyncThunk(
    "employer/getUserById",
    async (uid, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:8081/user/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch user"
            );
        }
    }
);

const initialState = {
    profile: null,
    jobs: [],
    applications: [],
    candidateDetails: {},
    userDetails: {},
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
                localStorage.setItem("employerId", action.payload.employerId);
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
            })

            //create job
            .addCase(createJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.jobs.push(action.payload); // assuming state.jobs is an array
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get job
            .addCase(getEmployerJobs.pending, (state) => {
                state.loading = true;
            })

            .addCase(getEmployerJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })

            .addCase(getEmployerJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //update job
            .addCase(updateJob.fulfilled, (state, action) => {
                const index = state.jobs.findIndex(
                    job => job.jobId === action.payload.jobId
                );

                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
            })

            //delete job
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter(
                    job => job.jobId !== action.payload
                );
            })
            //cgange status of jobb
            .addCase(updateJobStatus.fulfilled, (state, action) => {

                const index = state.jobs.findIndex(
                    job => job.jobId === action.payload.jobId
                );

                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }

            })

            //get all appli
            .addCase(getApplicationsByJob.fulfilled, (state, action) => {
                state.applications = action.payload;
            })

            //updat appli status
            .addCase(updateApplicationStatus.fulfilled, (state, action) => {

                const index = state.applications.findIndex(
                    app => app.applicationId === action.payload.applicationId
                );

                if (index !== -1) {
                    state.applications[index] = action.payload;
                }

            })

            //get candidate by cid
            .addCase(getCandidateByCid.fulfilled, (state, action) => {
                state.candidateDetails[action.payload.cid] = action.payload;
            })

            .addCase(getUserById.fulfilled, (state, action) => {
                state.userDetails[action.payload.uid] = action.payload;
            });
    },
});

export const { clearError, resetSuccess, clearProfile } = employerSlice.actions;

export default employerSlice.reducer;
