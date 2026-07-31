import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { UpdateCandidateProfile, UpdateUser } from "../../app/authSlice";
import toast from "react-hot-toast";

const EditProfileDialog = ({ open, handleClose, user, profile, onRefresh }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    summary: "",
  });

 useEffect(() => {
  if (open && user && profile) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        gender: profile?.gender || "",
        dob: profile?.dob || "",
        experience: profile?.experience || "",
        currentSalary: profile?.currentSalary || "",
        expectedSalary: profile?.expectedSalary || "",
        summary: profile?.summary || "",
      });
  }
}, [open, user, profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const userData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: user.city,
        state: user.state,
        country: user.country,
      };

      const profileData = {
        uid:profile.uid,
        gender: formData.gender,
        dob: formData.dob,
        experience: Number(formData.experience),
        currentSalary: formData.currentSalary
          ? Number(formData.currentSalary)
          : null,
        expectedSalary: formData.expectedSalary
          ? Number(formData.expectedSalary)
          : null,
        summary: formData.summary,
      };

      // await dispatch(
      //   UpdateUser({
      //     uid: user.uid,
      //     userData,
      //   })
      // ).unwrap();  
console.log(profileData);
      const res = await dispatch(
        UpdateCandidateProfile({
          uid: user.uid,
          profileData,
        })
      ).unwrap();
      // console.log(res);
      toast.success("Profile Updated Successfully");
      if (onRefresh) onRefresh();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Profile</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Current Salary"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Expected Salary"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Professional Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;