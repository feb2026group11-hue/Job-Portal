import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const StatsCard = () => {
  const stats = [
    { label: "Applied Jobs", value: 32 },
    { label: "Saved Jobs", value: 15 },
    { label: "Interviews", value: 5 },
    { label: "Profile Views", value: 87 },
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