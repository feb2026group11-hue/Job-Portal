import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Box, Typography, Paper, Button, LinearProgress } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import axios from "axios";
import { GetCandidateProfile } from "../../app/Authslice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ applied: 0, saved: 0, recommended: 0 });
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (user?.uid) {
          const prof = await dispatch(GetCandidateProfile(user.uid)).unwrap();
          setProfile(prof);

          if (prof?.cid) {
            // Fetch applications count
            const appRes = await axios.get(`http://localhost:8083/api/applications/candidate/${prof.cid}`);
            const savedJobs = JSON.parse(localStorage.getItem(`saved_jobs_${user.uid}`) || "[]");
            
            // Fetch recent jobs
            const jobsRes = await axios.get("http://localhost:8083/api/jobs");
            const openJobs = jobsRes.data.filter(j => j.status === "Open" || j.status === "open").slice(0, 3);
            setRecentJobs(openJobs);

            setStats({
              applied: appRes.data.length,
              saved: savedJobs.length,
              recommended: jobsRes.data.length > 0 ? Math.min(jobsRes.data.length, 5) : 0,
            });
          }
        }
      } catch (err) {
        console.error("Error loading candidate dashboard:", err);
      }
    };
    loadDashboardData();
  }, [user, dispatch]);

  const cards = [
    {
      title: "Applied Jobs",
      count: stats.applied,
      icon: <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 40, color: "#6366f1" }} />,
      bg: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
      path: "/dashboard/candidate/applied-jobs",
    },
    {
      title: "Saved Jobs",
      count: stats.saved,
      icon: <BookmarkBorderIcon sx={{ fontSize: 40, color: "#ec4899" }} />,
      bg: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
      path: "/dashboard/candidate/saved-jobs",
    },
    {
      title: "Recommended Vacancies",
      count: stats.recommended,
      icon: <WorkOutlineIcon sx={{ fontSize: 40, color: "#14b8a6" }} />,
      bg: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
      path: "/dashboard/candidate/jobs",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Welcome Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
            color: "#ffffff",
            borderRadius: 4,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)"
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Welcome back, {user?.name || "Job Seeker"}!
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
              Explore opportunities, match your skillset, and track your application status easily.
            </Typography>
            <Button
              component={Link}
              to="/dashboard/candidate/jobs"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "#ffffff",
                color: "#4f46e5",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1,
                "&:hover": {
                  bgcolor: "#f3f4f6"
                }
              }}
            >
              Browse Jobs
            </Button>
          </Box>
        </Paper>

        {/* Stats Grid */}
        <Grid container spacing={3} mb={4}>
          {cards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                component={Link}
                to={card.path}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                  }
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#475569", fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#1e293b", mt: 1 }}>
                    {card.count}
                  </Typography>
                </Box>
                <Box sx={{ bgcolor: "#ffffff", p: 1.5, borderRadius: "50%", display: "flex" }}>
                  {card.icon}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Jobs */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 3 }}>
                Recent Job Postings
              </Typography>
              {recentJobs.length === 0 ? (
                <Typography variant="body2" sx={{ color: "#64748b", py: 2 }}>
                  No open jobs posted recently. Check back later!
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {recentJobs.map((job) => (
                    <Box
                      key={job.jobId}
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        border: "1px solid #f1f5f9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "background-color 0.2s",
                        "&:hover": { bgcolor: "#f8fafc" }
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
                          {job.role} • {job.location}
                        </Typography>
                      </Box>
                      <Button
                        component={Link}
                        to="/dashboard/candidate/jobs"
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: 2,
                          borderColor: "#6366f1",
                          color: "#6366f1",
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Profile Tracker */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", height: "100%" }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}>
                Profile Status
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" sx={{ color: "#475569", fontWeight: 500 }}>
                    Completion Progress
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6366f1", fontWeight: 700 }}>
                    {profile ? "85%" : "20%"}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={profile ? 85 : 20}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#e2e8f0",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#6366f1",
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "#64748b", lineHeight: 1.6, mb: 3 }}>
                {profile 
                  ? "Great job! Your candidate profile is mostly complete. Upload a default resume to start applying to jobs in one click."
                  : "Welcome! To apply for jobs, please complete your candidate profile first."
                }
              </Typography>
              <Button
                component={Link}
                to="/dashboard/candidate-profile"
                variant="contained"
                sx={{
                  mt: "auto",
                  bgcolor: "#6366f1",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#4f46e5" }
                }}
              >
                Go to Profile
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
