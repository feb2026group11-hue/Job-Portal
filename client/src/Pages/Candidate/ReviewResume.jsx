import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Stack,
  IconButton,
  Card,
  CardContent,
  Grid,
  Divider,
  Alert
} from "@mui/material";
import { Delete, Add, Save, ArrowBack, AutoAwesome, Work, School, FolderSpecial, Code } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const parsedData = location.state?.parsedData || {};

  const [summary, setSummary] = useState(parsedData.summary || "");
  const [skills, setSkills] = useState(parsedData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const [experiences, setExperiences] = useState(
    parsedData.experiences && parsedData.experiences.length > 0
      ? parsedData.experiences
      : [{ title: "", company: "", startDate: "", endDate: "", description: "" }]
  );

  const [educations, setEducations] = useState(
    parsedData.educations && parsedData.educations.length > 0
      ? parsedData.educations
      : [{ degree: "", institution: "", passoutYear: "" }]
  );

  const [projects, setProjects] = useState(
    parsedData.projects && parsedData.projects.length > 0
      ? parsedData.projects
      : [{ title: "", description: "", projectUrl: "" }]
  );

  const [saving, setSaving] = useState(false);

  // Skill Handlers
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Experience Handlers
  const handleAddExperience = () => {
    setExperiences([...experiences, { title: "", company: "", startDate: "", endDate: "", description: "" }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const handleRemoveExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // Education Handlers
  const handleAddEducation = () => {
    setEducations([...educations, { degree: "", institution: "", passoutYear: "" }]);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const handleRemoveEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  // Project Handlers
  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "", projectUrl: "" }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Confirm and Save Handler
  const handleConfirmSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userObj = authUser || localUser;
      const uid = userObj?.uid || userObj?.id || 1;

      const payload = {
        summary,
        skills,
        experiences: experiences.filter((e) => e.title || e.company),
        educations: educations.filter((ed) => ed.degree || ed.institution),
        projects: projects.filter((p) => p.title),
      };
      console.log(payload)
      try {
        await axios.post(
          `http://localhost:8082/api/candidate/me/save-parsed-profile?uid=${uid}`,
          payload,
          { headers: { Authorization: `Bearer ${token}`, "X-User-Id": uid } }
        );
      } catch (gatewayErr) {
        // Fallback to direct candidate profile microservice port 8082
        await axios.post(
          `http://localhost:8082/api/candidate/me/save-parsed-profile?uid=${uid}`,
          payload,
          { headers: { Authorization: `Bearer ${token}`, "X-User-Id": uid } }
        );
      }

      toast.success("Profile successfully updated from parsed resume!");
      navigate("/dashboard/candidate-profile");
    } catch (err) {
      console.error("Save profile error:", err);
      toast.error("Failed to save parsed profile data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", color: "text.primary", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/dashboard/candidate-profile")}
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Back to Profile
            </Button>
            <Typography variant="h4" fontWeight={800} color="primary.main" display="flex" alignItems="center" gap={1}>
              <AutoAwesome sx={{ color: "#7C3AED" }} /> AI Resume Review & Sync
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            disabled={saving}
            onClick={handleConfirmSave}
            sx={{ px: 3, py: 1.2, borderRadius: 2.5, fontWeight: 700 }}
          >
            {saving ? "Saving Profile..." : "Confirm & Save to Profile"}
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
          <strong>Preview Stage (Zero Database Changes Yet):</strong> Review and edit your extracted details below. Click <strong>"Confirm & Save to Profile"</strong> when you are ready to update your profile.
        </Alert>

        {/* Professional Summary */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E2E8F0" }}>
          <Typography variant="h6" fontWeight={700} mb={1.5} display="flex" alignItems="center" gap={1}>
            <AutoAwesome color="action" /> Professional Summary
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Parsed professional summary..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Paper>

        {/* Skills */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E2E8F0" }}>
          <Typography variant="h6" fontWeight={700} mb={1.5} display="flex" alignItems="center" gap={1}>
            <Code color="action" /> Skills ({skills.length})
          </Typography>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
            {skills.map((skill, idx) => (
              <Chip
                key={idx}
                label={skill}
                onDelete={() => handleRemoveSkill(skill)}
                color="primary"
                variant="filled"
                sx={{ fontWeight: 600, px: 0.5 }}
              />
            ))}
          </Stack>
          <Box display="flex" gap={2} maxWidth={500}>
            <TextField
              size="small"
              fullWidth
              placeholder="Add additional skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            />
            <Button variant="outlined" startIcon={<Add />} onClick={handleAddSkill} sx={{ whiteSpace: "nowrap" }}>
              Add Skill
            </Button>
          </Box>
        </Paper>

        {/* Work Experience */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E2E8F0" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} display="flex" alignItems="center" gap={1}>
              <Work color="action" /> Work Experience ({experiences.length})
            </Typography>
            <Button startIcon={<Add />} size="small" variant="outlined" onClick={handleAddExperience}>
              Add Experience
            </Button>
          </Box>
          <Stack spacing={2.5}>
            {experiences.map((exp, idx) => (
              <Card key={idx} variant="outlined" sx={{ borderRadius: 2.5, position: "relative" }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography variant="subtitle1" fontWeight={700} color="primary">
                      Experience #{idx + 1}
                    </Typography>
                    {experiences.length > 1 && (
                      <IconButton size="small" color="error" onClick={() => handleRemoveExperience(idx)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Job Title / Designation"
                        value={exp.title || ""}
                        onChange={(e) => handleExperienceChange(idx, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Company Name"
                        value={exp.company || ""}
                        onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Start Date (e.g. 2022-01-01)"
                        value={exp.startDate || ""}
                        onChange={(e) => handleExperienceChange(idx, "startDate", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="End Date (e.g. 2024-05-01 or Present)"
                        value={exp.endDate || ""}
                        onChange={(e) => handleExperienceChange(idx, "endDate", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        size="small"
                        label="Description & Key Accomplishments"
                        value={exp.description || ""}
                        onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* Education */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: "1px solid #E2E8F0" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} display="flex" alignItems="center" gap={1}>
              <School color="action" /> Education ({educations.length})
            </Typography>
            <Button startIcon={<Add />} size="small" variant="outlined" onClick={handleAddEducation}>
              Add Education
            </Button>
          </Box>
          <Stack spacing={2.5}>
            {educations.map((edu, idx) => (
              <Card key={idx} variant="outlined" sx={{ borderRadius: 2.5 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography variant="subtitle1" fontWeight={700} color="primary">
                      Education #{idx + 1}
                    </Typography>
                    {educations.length > 1 && (
                      <IconButton size="small" color="error" onClick={() => handleRemoveEducation(idx)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Degree / Qualification"
                        value={edu.degree || ""}
                        onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        size="small"
                        label="University / Institution"
                        value={edu.institution || ""}
                        onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Passing Year"
                        value={edu.passoutYear || ""}
                        onChange={(e) => handleEducationChange(idx, "passoutYear", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* Key Projects */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: "1px solid #E2E8F0" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700} display="flex" alignItems="center" gap={1}>
              <FolderSpecial color="action" /> Projects ({projects.length})
            </Typography>
            <Button startIcon={<Add />} size="small" variant="outlined" onClick={handleAddProject}>
              Add Project
            </Button>
          </Box>
          <Stack spacing={2.5}>
            {projects.map((proj, idx) => (
              <Card key={idx} variant="outlined" sx={{ borderRadius: 2.5 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography variant="subtitle1" fontWeight={700} color="primary">
                      Project #{idx + 1}
                    </Typography>
                    {projects.length > 1 && (
                      <IconButton size="small" color="error" onClick={() => handleRemoveProject(idx)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Project Title"
                        value={proj.title || ""}
                        onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Project URL / GitHub Link"
                        value={proj.projectUrl || ""}
                        onChange={(e) => handleProjectChange(idx, "projectUrl", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        size="small"
                        label="Project Description & Tech Stack"
                        value={proj.description || ""}
                        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Paper>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2} mb={6}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/dashboard/candidate-profile")}
            sx={{ borderRadius: 2.5, px: 4 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Save />}
            disabled={saving}
            onClick={handleConfirmSave}
            sx={{ borderRadius: 2.5, px: 5, fontWeight: 700 }}
          >
            {saving ? "Saving..." : "Confirm & Save to Profile"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ReviewResume;
