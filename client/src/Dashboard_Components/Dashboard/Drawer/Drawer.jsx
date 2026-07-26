

// const drawerWidth = 240;


// export const Drawer = ({ open, handleDrawerToggle }) => {
//   const theme = useTheme();

//   return (
//     <>
      
//     </>
//   );
// };

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
  Avatar,
} from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CandidateDashboardHome = () => {
  const stats = [
    {
      title: "Applied Jobs",
      value: 12,
      icon: <WorkOutlineIcon />,
    },
    {
      title: "Saved Jobs",
      value: 8,
      icon: <BookmarkBorderIcon />,
    },
    {
      title: "Interviews",
      value: 2,
      icon: <EventAvailableOutlinedIcon />,
    },
    {
      title: "Profile Views",
      value: 87,
      icon: <VisibilityOutlinedIcon />,
    },
  ];

  const jobs = [
    {
      title: "Java Full Stack Developer",
      company: "Infosys",
      location: "Pune",
      salary: "8-12 LPA",
    },
    {
      title: "React Developer",
      company: "Wipro",
      location: "Mumbai",
      salary: "6-10 LPA",
    },
    {
      title: "Backend Developer",
      company: "TCS",
      location: "Bangalore",
      salary: "7-11 LPA",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "var(--backgroundColorMain)",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Welcome Banner */}
      <Card
        sx={{
          mb: 3,
          background:
            "linear-gradient(135deg,var(--backgroundColor1),var(--backgroundColor2))",
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9}>
              <Typography variant="h4" fontWeight={700}>
                Welcome Back, Sanket 👋
              </Typography>

              <Typography
                sx={{
                  color: "var(--primaryColor2)",
                  mt: 1,
                }}
              >
                Complete your profile and increase
                your chances of getting hired.
              </Typography>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor:
                    "var(--textHoverColor)",
                }}
              >
                Complete Profile
              </Button>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    mx: "auto",
                    bgcolor: "var(--textHoverColor)",
                  }}
                >
                  SG
                </Avatar>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats */}
      <Grid container spacing={3} mb={3}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                height: "100%",
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={700}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      color:
                        "var(--textHoverColor)",
                    }}
                  >
                    {item.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recommended Jobs */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
              >
                Recommended Jobs
              </Typography>

              {jobs.map((job, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      fontWeight={700}
                    >
                      {job.title}
                    </Typography>

                    <Typography>
                      {job.company}
                    </Typography>

                    <Typography
                      color="text.secondary"
                    >
                      {job.location}
                    </Typography>

                    <Typography
                      sx={{
                        color:
                          "var(--textHoverColor)",
                        mt: 1,
                      }}
                    >
                      ₹ {job.salary}
                    </Typography>

                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor:
                          "var(--textHoverColor)",
                      }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Completion */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              mb: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Profile Completion
              </Typography>

              <Typography
                variant="h3"
                mt={2}
                mb={2}
                fontWeight={700}
              >
                85%
              </Typography>

              <LinearProgress
                variant="determinate"
                value={85}
                sx={{
                  height: 10,
                  borderRadius: 5,
                }}
              />

              <Typography mt={2}>
                Add projects and certifications to
                reach 100%.
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
              >
                Quick Actions
              </Typography>

              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  fullWidth
                >
                  Upload Resume
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                >
                  Edit Profile
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                >
                  My Applications
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                >
                  Saved Jobs
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Application Status */}
      <Card
        sx={{
          mt: 3,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Application Pipeline
          </Typography>

          <Grid container spacing={2}>
            {[
              {
                title: "Applied",
                value: 12,
              },
              {
                title: "Reviewing",
                value: 5,
              },
              {
                title: "Shortlisted",
                value: 2,
              },
              {
                title: "Interview",
                value: 1,
              },
              {
                title: "Rejected",
                value: 4,
              },
            ].map((item, index) => (
              <Grid
                item
                xs={6}
                md={2.4}
                key={index}
              >
                <Card
                  variant="outlined"
                  sx={{
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    {item.value}
                  </Typography>

                  <Typography>
                    {item.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Latest Jobs */}
      <Card
        sx={{
          mt: 3,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Latest Jobs
          </Typography>

          {jobs.map((job, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                py: 2,
                borderBottom:
                  index !== jobs.length - 1
                    ? "1px solid #eee"
                    : "none",
              }}
            >
              <Box>
                <Typography
                  fontWeight={600}
                >
                  {job.title}
                </Typography>

                <Typography
                  color="text.secondary"
                >
                  {job.company}
                </Typography>
              </Box>

              <ArrowForwardIcon />
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CandidateDashboardHome;
