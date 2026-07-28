import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import candidateProfileReducer from "./CandidateProfileSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    candidateProfile: candidateProfileReducer
  },
});

export default store;