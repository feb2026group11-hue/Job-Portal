import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const StatsCard = ({ appliedCount = 0, savedCount = 0, interviewsCount = 0, profileViews = 0 }) => {
  const stats = [
    { label: "Applied Jobs", value: appliedCount },
    { label: "Saved Jobs", value: savedCount },
    { label: "Interviews", value: interviewsCount },
    { label: "Profile Views", value: profileViews },
  ];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Statistics
        </Typography>

        <Grid container spacing={2}>
          {stats.map((item) => (
            <Grid item xs={6} key={item.label}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </CardContent>
    </Card>
  );
};

export default StatsCard;