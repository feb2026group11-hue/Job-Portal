
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const EditProfileDialog = ({
  open,
  handleClose,
  profile
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Edit Profile
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              defaultValue={profile.fullName}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              defaultValue={profile.designation}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Location"
              defaultValue={profile.location}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Experience"
              defaultValue={profile.experience}
            />
            
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Salary"
              defaultValue={profile.expectedSalary}
            />
            
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Summary"
              defaultValue={profile.summary}
            />
          </Grid>
        </Grid>
      </DialogContent>
      

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;