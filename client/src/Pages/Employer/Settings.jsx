import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import toast from "react-hot-toast";
import axios from "axios";
import { UpdateUser } from "../../app/Authslice";

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // User Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    country: user?.country || "India",
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    applicationStatusUpdates: true,
    candidateMessages: true,
    smsAlerts: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (name) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Submit Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.phone) {
      toast.error("Name and Phone number are required");
      return;
    }

    try {
      const userData = {
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
        address: profileForm.address,
        country: profileForm.country,
        role: user.role,
      };

      await dispatch(UpdateUser({ uid: user.uid, userData })).unwrap();
      toast.success("Account Details Updated Successfully");
    } catch (err) {
      toast.error(err || "Failed to update profile details");
    }
  };

  // Submit Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8081/user/${user.uid}/change-password`,
        null,
        {
          params: {
            oldPassword: passwordForm.oldPassword,
            newPassword: passwordForm.newPassword,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data === true) {
        toast.success("Password Updated Successfully");
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Incorrect old password");
      }
    } catch (err) {
      toast.error("Failed to update password");
    }
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 4 }}>
          Settings
        </Typography>

        <Grid container spacing={4}>
          {/* Account Profile Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "#ffffff", height: "100%" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <PersonOutlineIcon sx={{ color: "#4f46e5" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                  Employer Account Profile
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleUpdateProfile}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      value={profileForm.email}
                      disabled
                      size="small"
                      helperText="Email address cannot be changed."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contact Number"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={profileForm.address}
                      onChange={handleProfileChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={profileForm.country}
                      onChange={handleProfileChange}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    bgcolor: "#4f46e5",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    "&:hover": { bgcolor: "#4338ca" },
                  }}
                >
                  Save Account Details
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Change Password Card */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "#ffffff", height: "100%" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <SecurityIcon sx={{ color: "#4f46e5" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                  Change Password
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box component="form" onSubmit={handleChangePassword}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      name="oldPassword"
                      value={passwordForm.oldPassword}
                      onChange={handlePasswordChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    bgcolor: "#4f46e5",
                    textTransform: "none",
                    fontWeight: 600,
                    px: 4,
                    "&:hover": { bgcolor: "#4338ca" },
                  }}
                >
                  Update Password
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Notification Preferences Card */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0", bgcolor: "#ffffff" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <NotificationsActiveOutlinedIcon sx={{ color: "#4f46e5" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                  Notification Preferences
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.emailAlerts}
                        onChange={() => handleNotificationToggle("emailAlerts")}
                        color="primary"
                      />
                    }
                    label="Email Alerts (Receive email notifications for new job applications)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.candidateMessages}
                        onChange={() => handleNotificationToggle("candidateMessages")}
                        color="primary"
                      />
                    }
                    label="Candidate Messages (Get notified when a candidate sends a direct message)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.applicationStatusUpdates}
                        onChange={() => handleNotificationToggle("applicationStatusUpdates")}
                        color="primary"
                      />
                    }
                    label="Applicant Updates (Receive updates when candidate profiles or details change)"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.smsAlerts}
                        onChange={() => handleNotificationToggle("smsAlerts")}
                        color="primary"
                      />
                    }
                    label="SMS Alerts (Receive text updates for priority candidate matches)"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings;
