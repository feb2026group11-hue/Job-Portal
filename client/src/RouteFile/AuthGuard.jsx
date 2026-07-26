import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {

const isAuthenticated = useSelector(
  (state) => state.auth.isAuthenticated
);
  // const user = localStorage.getItem("isAuthenticated");
// const user = true;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;