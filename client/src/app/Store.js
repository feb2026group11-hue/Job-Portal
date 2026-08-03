import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Authslice";
import candidateProfileReducer from "./CandidateProfileSlice";
import employerProfileReducer from "./EmployerSlice";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    candidateProfile: candidateProfileReducer,
    employerProfile: employerProfileReducer
  },
});

export default store;