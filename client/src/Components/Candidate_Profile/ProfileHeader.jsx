import { LocationOnSharp } from "@mui/icons-material";
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

const ProfileHeader = ({ profile, onEdit }) => {
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
              S
            </Avatar>
          </Grid>

          <Grid item xs>
            <Typography variant="h5" fontWeight={700}>
              {profile.name}
            </Typography>

            <Typography color="text.secondary">
              {profile.designation}
            </Typography>

            <Typography mt={1}>{profile.location}</Typography>

            <Typography>{profile.experience}</Typography>

            <Typography>
              Expected Salary: ₹{profile.expectedSalary}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" onClick={onEdit}>
                Edit Profile
              </Button>

              <Button variant="outlined">Upload Resume</Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography gutterBottom>Profile Completion</Typography>

            <LinearProgress
              variant="determinate"
              value={profile.completion}
              sx={{
                height: 10,
                borderRadius: 5,
              }}
            />

            <Typography mt={1}>{profile.completion}%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
