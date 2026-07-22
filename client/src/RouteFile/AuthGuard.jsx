import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const user = localStorage.getItem("Token");
// const user = localStorage.getItem("isAuthenticated");
// const user = true;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;