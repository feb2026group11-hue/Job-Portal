import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import toast from "react-hot-toast";
import axios from "axios";
import { GetCandidateProfile } from "../../app/Authslice";

const Jobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const loadData = async () => {
    try {
      // Fetch open jobs
      const jobsRes = await axios.get("http://localhost:8083/api/jobs");
      setJobs(jobsRes.data);

      if (user?.uid) {
        // Fetch candidate profile details
        const prof = await dispatch(GetCandidateProfile(user.uid)).unwrap();
        setProfile(prof);

        if (prof?.cid) {
          // Fetch existing applications
          const appRes = await axios.get(`http://localhost:8083/api/applications/candidate/${prof.cid}`);
          setAppliedJobs(appRes.data.map(app => app.jobId));
        }

        // Fetch bookmarked jobs
        const bookmarks = JSON.parse(localStorage.getItem(`saved_jobs_${user.uid}`) || "[]");
        setSavedJobs(bookmarks.map(j => j.jobId));
      }
    } catch (err) {
      console.error("Error fetching jobs/profile details:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [user, dispatch]);

  const toggleSaveJob = (job) => {
    if (!user) {
      toast.error("Please log in to bookmark jobs");
      return;
    }

    const currentBookmarks = JSON.parse(localStorage.getItem(`saved_jobs_${user.uid}`) || "[]");
    let updated;
    if (savedJobs.includes(job.jobId)) {
      updated = currentBookmarks.filter((j) => j.jobId !== job.jobId);
      setSavedJobs(savedJobs.filter(id => id !== job.jobId));
      toast.success("Job removed from bookmarks");
    } else {
      updated = [...currentBookmarks, job];
      setSavedJobs([...savedJobs, job.jobId]);
      toast.success("Job bookmarked successfully!");
    }
    localStorage.setItem(`saved_jobs_${user.uid}`, JSON.stringify(updated));
  };

  const handleApplyClick = (job) => {
    if (!user) {
      toast.error("Please log in to apply");
      return;
    }
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
        resumeId: 1 // Default/Placeholder Resume ID
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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLoc = job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === "All" || job.type === typeFilter;
    const isNotClosed = job.status !== "Closed" && job.status !== "closed";
    return matchesSearch && matchesLoc && matchesType && isNotClosed;
  });

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 4 }}>
          Explore Opportunities
        </Typography>

        {/* Filters Panel */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search jobs by title or keyword..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search by location..."
                variant="outlined"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Job Type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="All">All Types</MenuItem>
                <MenuItem value="FT">Full-Time (FT)</MenuItem>
                <MenuItem value="PT">Part-Time (PT)</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Intern">Internship</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {/* Jobs List Grid */}
        <Grid container spacing={3}>
          {filteredJobs.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: "#64748b", textAlign: "center", py: 8 }}>
                No jobs match your search parameters. Try altering your filters!
              </Typography>
            </Grid>
          ) : (
            filteredJobs.map((job) => {
              const isApplied = appliedJobs.includes(job.jobId);
              const isSaved = savedJobs.includes(job.jobId);

              return (
                <Grid item xs={12} md={6} key={job.jobId}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      position: "relative",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                      }
                    }}
                  >
                    {/* Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                          {job.title}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: "#64748b", mt: 0.5 }}>
                          {job.role}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => toggleSaveJob(job)} color="primary">
                        {isSaved ? <BookmarkIcon sx={{ color: "#ec4899" }} /> : <BookmarkBorderIcon sx={{ color: "#94a3b8" }} />}
                      </IconButton>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#475569",
                        mb: 3,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {job.description}
                    </Typography>

                    {/* Metadata chips */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3, mt: "auto" }}>
                      <Chip
                        icon={<LocationOnOutlinedIcon style={{ fontSize: 16 }} />}
                        label={job.location}
                        variant="outlined"
                        size="small"
                        sx={{ color: "#475569" }}
                      />
                      <Chip
                        icon={<WorkOutlineIcon style={{ fontSize: 16 }} />}
                        label={job.type}
                        variant="outlined"
                        size="small"
                        sx={{ color: "#6366f1", borderColor: "#c7d2fe", bgcolor: "#e0e7ff" }}
                      />
                      {job.salary && (
                        <Chip
                          icon={<PaidOutlinedIcon style={{ fontSize: 16 }} />}
                          label={`₹${parseFloat(job.salary).toLocaleString()}`}
                          variant="outlined"
                          size="small"
                          sx={{ color: "#14b8a6", borderColor: "#99f6e4", bgcolor: "#ccfbf1" }}
                        />
                      )}
                    </Box>

                    {/* Footer Apply Button */}
                    <Button
                      onClick={() => handleApplyClick(job)}
                      variant="contained"
                      disabled={isApplied}
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 2,
                        py: 1.2,
                        bgcolor: isApplied ? "#cbd5e1" : "#6366f1",
                        "&:hover": { bgcolor: "#4f46e5" }
                      }}
                    >
                      {isApplied ? "Applied" : "Apply Now"}
                    </Button>
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

export default Jobs;
