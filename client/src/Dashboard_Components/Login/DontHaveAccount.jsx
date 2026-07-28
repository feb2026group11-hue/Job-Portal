import { useTheme, InputAdornment, Avatar, Button } from "@mui/material";
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
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Register } from "../../app/authSlice";

const validationSchema = yup.object({
  name: yup.string().required("Full Name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  address: yup.string().required("Address is required"),

  city: yup.number().typeError("City is required").required("City is required"),

  state: yup
    .number()
    .typeError("State is required")
    .required("State is required"),

  country: yup.string().required("Country is required"),

  rid: yup.number().typeError("Role is required").required("Role is required"),

  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

const fieldSx = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
  },
};

export default function DontHaveAccount() {
  // const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      rid: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: async (values) => {
      // setLoading(true);
      setErrorMessage("");

      try {
        const payload = {
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          address: values.address,
          city: Number(values.city),
          state: Number(values.state),
          country: values.country,
          rid: Number(values.rid),
        };

        await dispatch(Register(payload)).unwrap();

        toast.success("Registration Successful");

        navigate("/");
      } catch (err) {
        setErrorMessage(err || "Registration Failed");
        toast.error(err || "Registration Failed");
      } finally {
        // setLoading(false);
      }
    },
  });

  const handleProfileChange = (e) => {
    setProfile(e.target.files[0]);
  };

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
            <img
              src="/assets/Logo/logo-job-portal.webp"
              alt="logo"
              width="120"
            />
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
                <MuiTypography sx={{ mb: 2 }}>
                  Choose Profile Picture
                </MuiTypography>
              </div>

              <Row>
                {/* Full Name */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={fieldSx}
                  />
                </Col>

                {/* Email */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={fieldSx}
                  />
                </Col>
              </Row>

              <Row>
                {/* Phone */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    sx={fieldSx}
                  />
                </Col>

                {/* Profile */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    type="file"
                    name="profile"
                    onChange={handleProfileChange}
                    inputProps={{ accept: "image/*" }}
                    sx={fieldSx}
                  />
                </Col>
              </Row>

              <Row>
                {/* Address */}
                <Col md={12}>
                  <MuiTextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                    sx={fieldSx}
                  />
                </Col>
              </Row>

              <Row>
                {/* City */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="City ID"
                    name="city"
                    type="number"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    sx={fieldSx}
                  />
                </Col>

                {/* State */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="State ID"
                    name="state"
                    type="number"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    sx={fieldSx}
                  />
                </Col>
              </Row>

              <Row>
                {/* Country */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                    sx={fieldSx}
                  />
                </Col>

                {/* Role */}
                <Col md={6}>
                  <MuiTextField
                    select
                    fullWidth
                    label="Role"
                    name="rid"
                    value={formik.values.rid}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rid && Boolean(formik.errors.rid)}
                    helperText={formik.touched.rid && formik.errors.rid}
                    sx={fieldSx}
                  > 
                    <MuiMenuItem value={3}>Candidate</MuiMenuItem>
                    <MuiMenuItem value={2}>Employer</MuiMenuItem>
                  </MuiTextField>
                </Col> 
              </Row>

              <Row>
                {/* Password */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={fieldSx}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MuiIconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </MuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Col>
                

                {/* Confirm Password */}
                <Col md={6}>
                  <MuiTextField
                    fullWidth
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    sx={fieldSx}
                  />
                </Col>
              </Row>

              <Button
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
              </Button>

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
