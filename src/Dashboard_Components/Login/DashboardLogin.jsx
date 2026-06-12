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
import { useDispatch } from "react-redux";
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

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      // navigate("/dashboard/home");
      navigate("/dashboard");
    }
  });

  // function login(values) {
  //   setErrorMessage("");
  //   axios
  //     .post("https://node-js-view-point.onrender.com/api/auth/login", {
  //       username: values.email,
  //       password: values.password,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.status === 200) {
  //         console.log("response");
  //         toast.success("Login successful!");
  //         console.log("end");
  //         localStorage.setItem("Token", response.data.token);
  //         localStorage.setItem("RefreshToken", response.data.refresh);
  //         localStorage.setItem("username", values.email);
  //         localStorage.setItem("Email", values.Username);
  //         if (localStorage.getItem("Token")) {
  //           navigate("dashboard/home");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log(error.response);
  //         setErrorMessage(error.response.data.message || "Login failed !");
  //         toast.error(error.response.data.message);
  //       } else {
  //         setErrorMessage("Login failed");
  //         toast.error("Login failed!");
  //       }
  //     });
  // }

  const login = async (values) => {
  setErrorMessage("");
  const credentials = {
      username: values.email,
      password: values.password,
    };
  setLoading(true);

  try {
    const response = await dispatch(Login(credentials)).unwrap();
    console?.log(response);
    toast.success("Login successful!");

    localStorage.setItem("Token", response?.token);
    localStorage.setItem("RefreshToken", response?.refresh);
    localStorage.setItem("username", values?.email);
    localStorage.setItem("Email", values?.email);
    // localStorage.setItem("Token", "token");

    if (response?.token) {
      navigate("/dashboard");
    }
  } catch (error) {
    setErrorMessage( "Login failed!");
    toast.error( "Login failed!");
  } finally {
    setLoading(false);
  }

};

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: "sanket01@gmail.com",
      password: "Sanket@12345",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });


  // return (
  //   <div className="d-flex justify-content-center align-items-center mt-5">
  //     <MuiCard
  //       className="d-flex justify-content-center align-items-center "
  //       sx={{
  //         py: 4,

  //         borderRadius: "10px",
  //         boxShadow: "none",
  //         border: "1px solid white",
  //       }}
  //     >
  //       <form
  //         onSubmit={formik.handleSubmit}
  //         className="d-flex justify-content-center align-items-center"
  //       >
  //         <MuiBox
  //           className="justify-content-center align-items-center"
  //           sx={{
  //             [theme.breakpoints.down("sm")]: {
  //               padding: "20px",
  //               [theme.breakpoints.down("xs")]: {
  //                 padding: "10px",
  //               },
  //             },
  //           }}
  //         >
  //           <MuiTypography
  //             className="d-flex justify-content-center align-items-center"
  //             variant="h5"
  //             sx={{ fontWeight: "bold", letterSpacing: "1px" }}
  //           >
  //             <img
  //               style={{
  //                 borderRadius: "50%",
  //                 width: "10%",
  //                 // "@media (max-width:400px)": { width: "50%" },
  //               }}
  //               src="/assets/Logo/logo-job-portal.webp"
  //             />
  //             <span className="mx-1" />
  //             Job <span style={{color:"rgb(2 88 205)"}}> Portal</span>
  //           </MuiTypography>
  //           <br />
  //           <MuiTypography
  //             className="d-flex justify-content-center align-items-center"
  //             variant="h5"
  //             sx={{
  //               fontWeight: "bolder",
  //               color: "#673Ab7",
  //               fontFamily: "sans-serif",
  //               letterSpacing: "1.5px",
  //               mb: 1,
  //             }}
  //           >
  //             Welcome
  //           </MuiTypography>
  //           <MuiTypography
  //             className="d-flex justify-content-center align-items-center"
  //             sx={{ mb: 3, color: "#677586", fontFamily: "sans-serif" }}
  //           >
  //             Enter your credentials to continue
  //           </MuiTypography>
  //           {errorMessage && (
  //             <MuiTypography
  //               className="d-flex justify-content-center"
  //               color="error"
  //               sx={{ mb: 2 }}
  //             >
  //               {errorMessage}
  //             </MuiTypography>
  //           )}
  //           <div className="d-flex justify-content-center align-items-center">
  //             <MuiTextField
  //               type="email"
  //               label="Email Address / Username"
  //               variant="filled"
  //               id="email"
  //               name="email"
  //               value={formik.values.email}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               error={formik.touched.email && Boolean(formik.errors.email)}
  //               helperText={formik.touched.email && formik.errors.email}
  //               InputLabelProps={{
  //                 sx: {
  //                   fontSize: "0.75rem",
  //                   "&.MuiInputLabel-shrink": {
  //                     marginTop: "1rem", // Adjust margin when label is shrunk (focused or filled)
  //                     paddingLeft: "0.25rem", // Adjust padding when label is shrunk
  //                     fontSize: "0.95rem", // Ensure the font size remains small when shrunk
  //                     transform: "translate(14px, -6px) scale(0.75)", // Adjust the transform to move the label correctly
  //                   },
  //                 },
  //               }}
  //               InputProps={{
  //                 disableUnderline: true, // Disable underline to make it look like outlined variant
  //                 sx: {
  //                   fontWeight: "550",
  //                   fontFamily: "inherit",
  //                   backgroundColor: "white", // Input background color
  //                   borderRadius: "10px", // Border radius
  //                   border: "1px solid rgba(0, 0, 0, 0.23)", // Default border color
  //                   paddingLeft: "0.3rem", // Padding inside the input
  //                   "&:hover": {
  //                     border: "1px solid rgba(0, 0, 0, 0.87)", // Border color on hover
  //                   },
  //                   "&.Mui-focused": {
  //                     border: "2px solid rgb(33, 150, 243)", // Border color on focus
  //                   },
  //                 },
  //               }}
  //               sx={{
  //                 mb: 2,
  //                 width: "100%", // Make the text field take the full width of the container
  //                 maxWidth: "400px", // Limit the maximum width
  //                 "& .MuiFilledInput-root": {
  //                   backgroundColor: "rgb(244 245 247)", // Set background color for the filled input
  //                   borderRadius: "10px",
  //                   "&:hover": {
  //                     backgroundColor: "rgb(244 245 247)",
  //                   },
  //                 },
  //                 "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
  //                   {
  //                     display: "none", // Hide the underline for both before and after states
  //                   },
  //               }}
  //             />
  //           </div>
  //           <div className="d-flex justify-content-center align-items-center">
  //             <MuiTextField
  //               type={showPassword ? "text" : "password"}
  //               label="Password"
  //               variant="filled"
  //               id="password"
  //               name="password"
  //               value={formik.values.password}
  //               onChange={formik.handleChange}
  //               onBlur={formik.handleBlur}
  //               error={
  //                 formik.touched.password && Boolean(formik.errors.password)
  //               }
  //               helperText={formik.touched.password && formik.errors.password}
  //               InputLabelProps={{
  //                 sx: {
  //                   fontSize: "0.95rem",
  //                   "&.MuiInputLabel-shrink": {
  //                     marginTop: "1rem", // Adjust margin when label is shrunk (focused or filled)
  //                     paddingLeft: "0.25rem", // Adjust padding when label is shrunk
  //                     fontSize: "0.95rem", // Ensure the font size remains small when shrunk
  //                     transform: "translate(14px, -6px) scale(0.75)", // Adjust the transform to move the label correctly
  //                   },
  //                 },
  //               }}
  //               InputProps={{
  //                 disableUnderline: true, // Disable underline to make it look like outlined variant
  //                 endAdornment: (
  //                   <InputAdornment position="end">
  //                     <MuiIconButton
  //                       aria-label="toggle password visibility"
  //                       onClick={handleClickShowPassword}
  //                       onMouseDown={handleMouseDownPassword}
  //                       edge="end"
  //                     >
  //                       {showPassword ? <VisibilityOff /> : <Visibility />}
  //                     </MuiIconButton>
  //                   </InputAdornment>
  //                 ),
  //                 sx: {
  //                   fontWeight: "550",
  //                   fontFamily: "inherit",
  //                   backgroundColor: "white", // Input background color
  //                   borderRadius: "10px", // Border radius
  //                   border: "1px solid rgba(0, 0, 0, 0.23)", // Default border color
  //                   paddingLeft: "0.3rem", // Padding inside the input
  //                   "&:hover": {
  //                     border: "1px solid rgba(0, 0, 0, 0.87)", // Border color on hover
  //                   },
  //                   "&.Mui-focused": {
  //                     border: "2px solid rgb(33, 150, 243)", // Border color on focus
  //                   },
  //                 },
  //               }}
  //               sx={{
  //                 width: "100%", // Make the text field take the full width of the container
  //                 maxWidth: "400px", // Limit the maximum width
  //                 "& .MuiFilledInput-root": {
  //                   backgroundColor: "rgb(232, 240, 254)", // Set background color for the filled input
  //                   borderRadius: "10px",
  //                   mb: 2,
  //                   "&:hover": {
  //                     backgroundColor: "rgb(232, 240, 254)",
  //                   },
  //                 },
  //                 "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
  //                   {
  //                     display: "none", // Hide the underline for both before and after states
  //                   },
  //               }}
  //             />
  //           </div>
  //           <MuiBox
  //             sx={{
  //               display: "flex",
  //               justifyContent: "space-between",
  //               mb: 2,
  //               width: "100%",
  //               maxWidth: "400px",
  //               marginLeft: "auto",
  //               marginRight: "auto",
  //             }}
  //           >
  //             <MuiBox
  //               sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 "@media (max-width:430px)": {
  //                   flexDirection: "row",
  //                 },
  //               }}
  //             >
  //               <MuiFormControlLabel
  //                 control={
  //                   <MuiCheckBox
  //                     name="checkedA"
  //                     color="primary"
  //                     onChange={(e) => setRememberMe(e.target.checked)}
  //                     checked={rememberMe}
  //                   />
  //                 }
  //                 label="Keep me logged in"
  //                 sx={{
  //                   "& .MuiFormControlLabel-label": {
  //                     "@media (max-width:430px)": {
  //                       fontSize: "smaller",
  //                     },
  //                   },
  //                 }}
  //               />
  //             </MuiBox>
  //             <MuiBox
  //               sx={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 "@media (max-width:430px)": {
  //                   flexDirection: "row",
  //                 },
  //               }}
  //             >
  //               <MuiTypography
  //                 className="text-decoration-none"
  //                 sx={{
  //                   color: "#673Ab7",
  //                   "@media (max-width:430px)": {
  //                     fontSize: "smaller",
  //                   },
  //                 }}
  //                 as={Link}
  //                 to="/forgotpassword"
  //               >
  //                 Forgot Password?
  //               </MuiTypography>
  //             </MuiBox>
  //           </MuiBox>
  //           <div className="d-flex justify-content-center align-items-center">
  //             <MuiButton
  //               type="submit"
  //               className="signupButton"
  //               variant="filled"
  //               sx={{
  //                 backgroundColor: "#673Ac7",
  //                 width: "65%",
  //                 color: "white",
  //                 fontWeight: "bold",
  //                 p: 1,
  //                 mb: 2,
  //                 "@media (max-width:500px)": { width: "90%" },
  //               }}
  //             >
  //               {/* Sign In */}
  //               {loading ? (
  //             <div className="flex items-center justify-center space-x-2 mx-auto">
  //               <span>Sign In</span>
  //               <div className="w-4 h-4 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //             </div>
  //           ) : (
  //             "Sign In"
  //           )}
  //             </MuiButton>
  //           </div>
  //           <MuiDivider
  //             sx={{
  //               mb: 2,
  //               borderBottom: "1px solid",
  //               width: "70%",
  //               mx: "auto",
  //             }}
  //           />
  //           <MuiTypography
  //             className="d-flex justify-content-center align-items-center text-decoration-none"
  //             sx={{
  //               color: "#121226",
  //               fontWeight: "bold",
  //               "@media (max-width:430px)": { fontSize: "smaller" },
  //             }}
  //             as={Link}
  //             to="/signup"
  //           >
  //             Don't have an account?
  //           </MuiTypography>
  //         </MuiBox>
  //       </form>
  //     </MuiCard>
  //   </div>
  // );


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
            background:
              "linear-gradient(135deg,#001F5B 0%, #0258CD 100%)",
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
            Discover thousands of jobs, connect with top
            companies, and take your career to the next
            level.
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
            boxShadow:
              "0px 15px 40px rgba(0,0,0,0.08)",
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
              error={
                formik.touched.email &&
                Boolean(formik.errors.email)
              }
              helperText={
                formik.touched.email &&
                formik.errors.email
              }
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />

            <MuiTextField
              fullWidth
              type={
                showPassword ? "text" : "password"
              }
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password &&
                formik.errors.password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MuiIconButton
                      onClick={
                        handleClickShowPassword
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
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
                background:
                  "linear-gradient(135deg,#001F5B,#0258CD)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg,#001844,#0148AF)",
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

            <MuiTypography
              textAlign="center"
            >
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
