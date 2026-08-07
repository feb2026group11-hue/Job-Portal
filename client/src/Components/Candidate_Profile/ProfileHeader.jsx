import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";

const ProfileHeader = ({ user, profile, onEdit, progress = 0 }) => {
  return (
    <Card elevation={1}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar 
              sx={{
                width: 110,
                height: 110,
                fontSize: 40,
                bgcolor: "#2563EB",
              }}
            > 
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>

          <Grid item xs>
            <Typography variant="h5" fontWeight={700}>
              {user?.name}
            </Typography>

            <Typography color="text.secondary">
              {user?.role}
            </Typography>

            <Typography mt={1}>
              {user?.address}, {user?.country}
            </Typography>

            <Typography>
              Experience: {profile?.experience ?? 0} Years
            </Typography>

            <Typography>
              Expected Salary:{" "}
              {profile?.expectedSalary
                ? `₹${profile.expectedSalary}`
                : "Not Mentioned"}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" onClick={onEdit}>
                Edit Profile
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography gutterBottom>
              Profile Completion
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />

            <Typography mt={1}>{progress}%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;