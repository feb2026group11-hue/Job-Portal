import { useTheme, InputAdornment } from "@mui/material";
import * as yup from "yup";
import {
  MuiBox,
  MuiButton,
  MuiCard,
  MuiCheckBox,
  MuiDivider,
  MuiFormControlLabel,
  MuiIconButton,
  MuiTextField,
  MuiTypography,
} from "../../MUIComponents/Mui";
// import "./Css/DashboardAll.css";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../app/authSlice";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const DashboardLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/dashboard/home");
      navigate("/dashboard");
    }
  });

  const login = async (values) => {
    setErrorMessage("");
    setLoading(true);

    try {
      const credentials = {
        username: values.email,
        password: values.password,
      };
      const response = await dispatch(Login(credentials)).unwrap();

      toast.success("Login Successful");
      console.log(response);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Login failed!");
      toast.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      email: "testuser01@gmail.com",
      password: "TestUser@123",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div
      className="container-fluid p-0"
      style={{ minHeight: "100vh", background: "#f8fbff" }}
    >
      <div className="row g-0 min-vh-100">
        {/* Left Side */}
        <div className="col-lg-6 d-none d-lg-flex">
          <MuiBox
            sx={{
              width: "100%",
              background: "linear-gradient(135deg,#001F5B 0%, #0258CD 100%)",
              color: "#fff",
              p: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/Logo/logo-job-portal.webp"
              alt="Logo"
              style={{
                width: "110px",
                borderRadius: "50%",
                background: "#fff",
                padding: "10px",
              }}
            />

            <MuiTypography
              variant="h2"
              sx={{
                fontWeight: 800,
                mt: 4,
              }}
            >
              Job Portal
            </MuiTypography>

            <MuiTypography
              variant="h6"
              sx={{
                mt: 2,
                opacity: 0.9,
              }}
            >
              Connecting Talent, Creating Opportunities
            </MuiTypography>

            <MuiTypography
              sx={{
                mt: 4,
                maxWidth: "500px",
                opacity: 0.85,
              }}
            >
              Discover thousands of jobs, connect with top companies, and take
              your career to the next level.
            </MuiTypography>

            <div className="mt-5">
              <h5>✓ 10,000+ Active Jobs</h5>
              <h5 className="mt-3">✓ 500+ Companies</h5>
              <h5 className="mt-3">✓ Fast Hiring Process</h5>
              <h5 className="mt-3">✓ Career Growth</h5>
            </div>
          </MuiBox>
        </div>

        {/* Right Side */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
          <MuiCard
            sx={{
              width: "100%",
              maxWidth: "500px",
              p: 5,
              borderRadius: "24px",
              border: "1px solid #E5EAF2",
              boxShadow: "0px 15px 40px rgba(0,0,0,0.08)",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center mb-4">
                <img
                  src="/assets/Logo/logo-job-portal.webp"
                  alt="logo"
                  style={{
                    width: "70px",
                    borderRadius: "50%",
                  }}
                />

                <MuiTypography
                  variant="h4"
                  sx={{
                    mt: 2,
                    fontWeight: 700,
                  }}
                >
                  Welcome Back
                </MuiTypography>

                <MuiTypography
                  sx={{
                    color: "#677586",
                    mt: 1,
                  }}
                >
                  Sign in to continue
                </MuiTypography>
              </div>

              {errorMessage && (
                <MuiTypography
                  color="error"
                  sx={{
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  {errorMessage}
                </MuiTypography>
              )}

              <MuiTextField
                fullWidth
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <MuiTextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MuiIconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </MuiIconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <MuiFormControlLabel
                  control={
                    <MuiCheckBox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember Me"
                />

                <MuiTypography
                  component={Link}
                  to="/forgotpassword"
                  sx={{
                    color: "#0258CD",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Forgot Password?
                </MuiTypography>
              </div>

              <MuiButton
                type="submit"
                fullWidth
                sx={{
                  py: 1.6,
                  borderRadius: "12px",
                  color: "#fff",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "16px",
                  background: "linear-gradient(135deg,#001F5B,#0258CD)",

                  "&:hover": {
                    background: "linear-gradient(135deg,#001844,#0148AF)",
                  },
                }}
              >
                {loading ? (
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </MuiButton>

              <MuiDivider sx={{ my: 4 }} />

              <MuiTypography textAlign="center">
                Don't have an account?{" "}
                <MuiTypography
                  component={Link}
                  to="/signup"
                  sx={{
                    color: "#0258CD",
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Sign Up
                </MuiTypography>
              </MuiTypography>
            </form>
          </MuiCard>
        </div>
      </div>
    </div>
  );
};
export default DashboardLogin;
