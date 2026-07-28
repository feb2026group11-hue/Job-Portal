import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import toast from "react-hot-toast";
import axios from "axios";
import { GetCandidateProfile } from "../../app/Authslice";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [savedJobs, setSavedJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const loadData = async () => {
    try {
      if (user?.uid) {
        // Load bookmarks
        const bookmarks = JSON.parse(localStorage.getItem(`saved_jobs_${user.uid}`) || "[]");
        setSavedJobs(bookmarks);

        // Load profile and existing applications
        const prof = await dispatch(GetCandidateProfile(user.uid)).unwrap();
        setProfile(prof);

        if (prof?.cid) {
          const appRes = await axios.get(`http://localhost:8083/api/applications/candidate/${prof.cid}`);
          setAppliedJobs(appRes.data.map(app => app.jobId));
        }
      }
    } catch (err) {
      console.error("Error loading saved jobs:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [user, dispatch]);

  const removeBookmark = (jobId) => {
    const updated = savedJobs.filter((job) => job.jobId !== jobId);
    setSavedJobs(updated);
    localStorage.setItem(`saved_jobs_${user.uid}`, JSON.stringify(updated));
    toast.success("Job removed from bookmarks");
  };

  const handleApplyClick = (job) => {
    if (!profile?.cid) {
      toast.error("Please complete your candidate profile first!");
      return;
    }
    setSelectedJob(job);
    setOpenModal(true);
  };

  const handleConfirmApply = async () => {
    try {
      const payload = {
        jobId: selectedJob.jobId,
        candidateId: profile.cid,
        resumeId: 1
      };

      await axios.post("http://localhost:8083/api/applications", payload);
      toast.success("Application submitted successfully!");
      setAppliedJobs([...appliedJobs, selectedJob.jobId]);
      setOpenModal(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to submit application.";
      toast.error(msg);
    }
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 4 }}>
          Bookmarked Jobs
        </Typography>

        <Grid container spacing={3}>
          {savedJobs.length === 0 ? (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 6, textAlign: "center", border: "1px dashed #cbd5e1", borderRadius: 4 }}>
                <Typography variant="body1" sx={{ color: "#64748b" }}>
                  You haven't bookmarked any jobs yet. Browse open jobs to save your favorites!
                </Typography>
              </Paper>
            </Grid>
          ) : (
            savedJobs.map((job) => {
              const isApplied = appliedJobs.includes(job.jobId);

              return (
                <Grid item xs={12} key={job.jobId}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "box-shadow 0.2s",
                      "&:hover": {
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                      }
                    }}
                  >
                    <Box sx={{ flex: 1, mr: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                          {job.title}
                        </Typography>
                        <Chip
                          icon={<WorkOutlineIcon style={{ fontSize: 14 }} />}
                          label={job.type}
                          size="small"
                          sx={{ color: "#6366f1", borderColor: "#c7d2fe", bgcolor: "#e0e7ff" }}
                        />
                      </Box>
                      
                      <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 2 }}>
                        {job.role} • {job.location}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#64748b" }}>
                          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
                          <Typography variant="body2">{job.location}</Typography>
                        </Box>
                        {job.salary && (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#14b8a6" }}>
                            <PaidOutlinedIcon sx={{ fontSize: 18 }} />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              ₹{parseFloat(job.salary).toLocaleString()}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IconButton onClick={() => removeBookmark(job.jobId)} color="error" sx={{ border: "1px solid #fee2e2" }}>
                        <DeleteOutlineIcon />
                      </IconButton>
                      <Button
                        onClick={() => handleApplyClick(job)}
                        variant="contained"
                        disabled={isApplied}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: 2,
                          px: 3,
                          py: 1.2,
                          bgcolor: isApplied ? "#cbd5e1" : "#6366f1",
                          "&:hover": { bgcolor: "#4f46e5" }
                        }}
                      >
                        {isApplied ? "Applied" : "Apply Now"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              );
            })
          )}
        </Grid>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Application</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: "#334155" }}>
            Are you sure you want to apply for the position of <strong>{selectedJob?.title}</strong>? We will submit your default profile resume to this employer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenModal(false)} variant="outlined" sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmApply} variant="contained" sx={{ bgcolor: "#6366f1", textTransform: "none" }}>
            Confirm Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavedJobs;
