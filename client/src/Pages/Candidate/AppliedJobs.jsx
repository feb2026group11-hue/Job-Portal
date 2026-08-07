import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Box, Typography, Paper, Stepper, Step, StepLabel, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import { GetCandidateProfile } from "../../app/Authslice";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [applications, setApplications] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      if (user?.uid) {
        const prof = await dispatch(GetCandidateProfile(user.uid)).unwrap();
        if (prof?.cid) {
          // Fetch candidate applications
          const appRes = await axios.get(`http://localhost:8083/api/applications/candidate/${prof.cid}`);
          const apps = appRes.data;
          setApplications(apps);

          // Fetch job details for all applications in parallel
          const uniqueJobIds = [...new Set(apps.map(app => app.jobId))];
          const jobDetailsPromises = uniqueJobIds.map(id =>
            axios.get(`http://localhost:8083/api/jobs/${id}`).then(res => ({ id, data: res.data })).catch(() => ({ id, data: null }))
          );
          
          const jobDetailsResults = await Promise.all(jobDetailsPromises);
          const map = {};
          jobDetailsResults.forEach(item => {
            if (item.data) {
              map[item.id] = item.data;
            }
          });
          setJobsMap(map);
        }
      }
    } catch (err) {
      console.error("Error loading candidate applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user, dispatch]);

  const steps = ["Applied", "Shortlisted", "Final Decision"];

  const getActiveStep = (statusId) => {
    // 1 = Applied, 2 = Under Review, 3 = Shortlisted, 4 = Interview Scheduled, 5 = Selected, 6 = Rejected
    if (statusId === 1 || statusId === 2) return 0;
    if (statusId === 3 || statusId === 4) return 1;
    if (statusId === 5 || statusId === 6) return 2;
    return 0;
  };

  const getStatusChipColor = (statusId) => {
    if (statusId === 1) return { color: "#6366f1", bg: "#e0e7ff", label: "Applied" };
    if (statusId === 2) return { color: "#0ea5e9", bg: "#e0f2fe", label: "Under Review" };
    if (statusId === 3) return { color: "#eab308", bg: "#fef9c3", label: "Shortlisted" };
    if (statusId === 4) return { color: "#a855f7", bg: "#f3e8ff", label: "Interview Scheduled" };
    if (statusId === 5) return { color: "#10b981", bg: "#d1fae5", label: "Selected" };
    if (statusId === 6) return { color: "#ef4444", bg: "#fee2e2", label: "Rejected" };
    return { color: "#64748b", bg: "#f1f5f9", label: "Applied" };
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 4 }}>
          Application Tracking
        </Typography>

        {loading ? (
          <Typography variant="body1" sx={{ color: "#64748b" }}>Loading your applications...</Typography>
        ) : applications.length === 0 ? (
          <Paper elevation={0} sx={{ p: 6, textAlign: "center", border: "1px dashed #cbd5e1", borderRadius: 4 }}>
            <Typography variant="body1" sx={{ color: "#64748b" }}>
              You haven't submitted any job applications yet. Go to Browse Jobs to start applying!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {applications.map((app) => {
              const job = jobsMap[app.jobId];
              const chip = getStatusChipColor(app.statusId);
              const activeStep = getActiveStep(app.statusId);
              const formattedDate = new Date(app.applicationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <Grid item xs={12} key={app.applicationId}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      transition: "box-shadow 0.2s",
                      "&:hover": {
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                      }
                    }}
                  >
                    {/* Top Row: Job Title and Status Pill */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                          {job ? job.title : `Job #${app.jobId}`}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: "#64748b", mt: 0.5 }}>
                          {job ? `${job.role} • ${job.location}` : "Details unavailable"}
                        </Typography>
                      </Box>
                      <Chip
                        label={chip.label}
                        sx={{
                          bgcolor: chip.bg,
                          color: chip.color,
                          fontWeight: 700,
                          px: 1.5,
                          fontSize: 13,
                        }}
                      />
                    </Box>

                    {/* Middle Row: Stepper showing Application Status */}
                    <Box sx={{ py: 2, width: "100%" }}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                          const isRejected = app.statusId === 6 && index === 2;
                          const stepLabelProps = {};
                          if (isRejected) {
                            stepLabelProps.error = true;
                          }
                          return (
                            <Step key={label}>
                              <StepLabel {...stepLabelProps}>
                                {isRejected ? "Rejected" : index === 2 && app.statusId === 5 ? "Selected" : label}
                              </StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                    </Box>

                    {/* Bottom Row: Timestamp */}
                    <Box
                      sx={{
                        pt: 2,
                        borderTop: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#64748b",
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Applied on {formattedDate}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default AppliedJobs;
