
import { useTheme, InputAdornment, Avatar } from "@mui/material";
import * as yup from "yup";
import {
  MuiBox,
  MuiButton,
  MuiCard,
  MuiDivider,
  MuiIconButton,
  MuiMenuItem,
  MuiTextField,
  MuiTypography,
} from "../../MUIComponents/Mui";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = yup.object({
  fname: yup.string().required("First name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required(),
});

// const ProfileImages = [
//   { id: 1, link: "https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg" },
//   { id: 2, link: "https://img.freepik.com/free-photo/3d-illustration-business-man-with-glasses-grey-background-clipping-path_1142-58140.jpg" },
//   { id: 3, link: "https://img.freepik.com/free-photo/3d-illustration-cute-little-girl-with-green-jacket_1142-42111.jpg" },
//   { id: 4, link: "https://img.freepik.com/free-photo/medium-shot-little-girl-indoors_23-2151061744.jpg" },
//   { id: 5, link: "https://static.qobuz.com/images/covers/ua/a8/fy53g3rnha8ua_600.jpg" },
// ];

const fieldSx = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
};

export default function DontHaveAccount() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fname: "",
      lname: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post("https://node-js-view-point.onrender.com/api/auth/signup", {
          profile,
          fullname: values.fname + " " + values.lname,
          username: values.email,
          gender: values.gender,
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
        .then(() => {
          toast.success("User Created");
          navigate("/");
        })
        .catch((err) => {
          setErrorMessage(err?.response?.data?.message || "User creation failed");
        });
    },
  });

  return (
    <div className="container-fluid p-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0 min-vh-100">
        <div className="col-lg-6 d-none d-lg-flex">
          <MuiBox
            sx={{
              width: "100%",
              background: "linear-gradient(135deg,#001F5B,#0258CD)",
              color: "#fff",
              p: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img src="/assets/Logo/logo-job-portal.webp" alt="logo" width="120" />
            <MuiTypography variant="h2" sx={{ fontWeight: 800, mt: 3 }}>
              Join Job Portal
            </MuiTypography>
            <MuiTypography variant="h6" sx={{ mt: 2 }}>
              Connecting Talent, Creating Opportunities
            </MuiTypography>
          </MuiBox>
        </div>

        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
          <MuiCard sx={{ width: "100%", maxWidth: 850, p: 4, borderRadius: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center mb-4">
                <img src="/assets/logo-job-portal.webp" alt="" width="70" />
                <MuiTypography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
                  Create Account
                </MuiTypography>
              </div>

              {errorMessage && (
                <MuiTypography color="error" textAlign="center">
                  {errorMessage}
                </MuiTypography>
              )}

              <div className="text-center mb-4">
                <MuiTypography sx={{ mb: 2 }}>Choose Profile Picture</MuiTypography>
                {/* <div className="d-flex justify-content-center gap-2 flex-wrap">
                  {ProfileImages.map((pic) => (
                    <Avatar
                      key={pic.id}
                      src={pic.link}
                      onClick={() => setProfile(pic.link)}
                      sx={{
                        width: 60,
                        height: 60,
                        cursor: "pointer",
                        border: profile === pic.link ? "3px solid #0258CD" : "2px solid #ddd",
                      }}
                    />
                  ))}
                </div> */}
              </div>

              <Row>
                <Col md={6}>
                  <MuiTextField fullWidth label="First Name" name="fname" value={formik.values.fname} onChange={formik.handleChange} sx={fieldSx} />
                </Col>
                <Col md={6}>
                  <MuiTextField fullWidth label="Last Name" name="lname" value={formik.values.lname} onChange={formik.handleChange} sx={fieldSx} />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <MuiTextField fullWidth label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} sx={fieldSx} />
                </Col>
                <Col md={6}>
                  <MuiTextField select fullWidth label="Gender" name="gender" value={formik.values.gender} onChange={formik.handleChange} sx={fieldSx}>
                    <MuiMenuItem value="male">Male</MuiMenuItem>
                    <MuiMenuItem value="female">Female</MuiMenuItem>
                    <MuiMenuItem value="other">Other</MuiMenuItem>
                  </MuiTextField>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    sx={fieldSx}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MuiIconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </MuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Col>
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    sx={fieldSx}
                  />
                </Col>
              </Row>

              <MuiButton
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  color: "#fff",
                  borderRadius: 3,
                  background: "linear-gradient(135deg,#001F5B,#0258CD)",
                }}
              >
                Create Account
              </MuiButton>

              <MuiDivider sx={{ my: 3 }} />

              <MuiTypography textAlign="center">
                Already have an account? <Link to="/">Sign In</Link>
              </MuiTypography>
            </form>
          </MuiCard>
        </div>
      </div>
    </div>
  );
}
