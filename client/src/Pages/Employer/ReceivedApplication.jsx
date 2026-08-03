import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    MenuItem,
    Select,
    Chip,
    Grid,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getApplicationsByJob, getCandidateByCid, getUserById, updateApplicationStatus } from "../../app/EmployerSlice";

const ReceivedApplication = ({ onlyShortlisted = false }) => {

    const { jobId } = useParams();
    console.log(jobId)
    const dispatch = useDispatch();

    const [candidateEducations, setCandidateEducations] = useState({});
    const [candidateSkills, setCandidateSkills] = useState({});
    const [candidateProjects, setCandidateProjects] = useState({});
    const [candidateCertificates, setCandidateCertificates] = useState({});
    const [eduFilter, setEduFilter] = useState("");
    const [marksFilter, setMarksFilter] = useState("");
    const [expFilter, setExpFilter] = useState("");

    const applications = useSelector(
        state => state.employerProfile.applications
    );

    const candidateDetails = useSelector(
        state => state.employerProfile.candidateDetails
    );

    const userDetails = useSelector(
        state => state.employerProfile.userDetails
    );

    const displayedApplications = onlyShortlisted
        ? applications.filter(app => app.statusId === 2)
        : applications;

    // useEffect(() => {

    //     if (jobId) {
    //         const res = dispatch(getApplicationsByJob(jobId));
    //         console.log(res)
    //     }

    // }, [dispatch, jobId]);


    useEffect(() => {
        if (!jobId) return;

        const fetchData = async () => {

            const res = await dispatch(getApplicationsByJob(jobId));

            if (getApplicationsByJob.fulfilled.match(res)) {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                for (const app of res.payload) {
                    console.log(app);
                    const candidateRes = await dispatch(
                        getCandidateByCid(app.candidateId)
                    );

                    if (getCandidateByCid.fulfilled.match(candidateRes)) {

                        await dispatch(
                            getUserById(candidateRes.payload.uid)
                        );

                        // Fetch education details
                        try {
                            const eduRes = await axios.get(
                                `http://localhost:8082/education/candidate/${app.candidateId}`,
                                { headers }
                            );
                            setCandidateEducations(prev => ({
                                ...prev,
                                [app.candidateId]: eduRes.data || []
                            }));
                        } catch (e) {
                            console.error("Error fetching education for candidate:", app.candidateId, e);
                        }

                        // Fetch skills
                        try {
                            const skillsRes = await axios.get(
                                `http://localhost:8082/api/candidate-skills/candidate/${app.candidateId}`,
                                { headers }
                            );
                            setCandidateSkills(prev => ({
                                ...prev,
                                [app.candidateId]: skillsRes.data || []
                            }));
                        } catch (e) {
                            console.error("Error fetching skills for candidate:", app.candidateId, e);
                        }

                        // Fetch projects
                        try {
                            const projRes = await axios.get(
                                `http://localhost:8082/api/projects/candidate/${app.candidateId}`,
                                { headers }
                            );
                            setCandidateProjects(prev => ({
                                ...prev,
                                [app.candidateId]: projRes.data || []
                            }));
                        } catch (e) {
                            console.error("Error fetching projects for candidate:", app.candidateId, e);
                        }

                        // Fetch certificates
                        try {
                            const certRes = await axios.get(
                                `http://localhost:8082/api/certificates/candidate/${app.candidateId}`,
                                { headers }
                            );
                            setCandidateCertificates(prev => ({
                                ...prev,
                                [app.candidateId]: certRes.data || []
                            }));
                        } catch (e) {
                            console.error("Error fetching certificates for candidate:", app.candidateId, e);
                        }

                    }

                }

            }

        };

        fetchData();

    }, [dispatch, jobId]);
    const handleStatusChange = async (
        applicationId,
        statusId
    ) => {

        const res = await dispatch(
            updateApplicationStatus({
                applicationId,
                statusId,
            })
        );

        if (updateApplicationStatus.fulfilled.match(res)) {
            toast.success("Status Updated");
        } else {
            toast.error("Failed");
        }

    };

    const filteredApplications = displayedApplications.filter(app => {
        const candidate = candidateDetails[app?.candidateId];

        // Filter by Experience
        if (expFilter && candidate) {
            const candidateExp = parseFloat(candidate.experience || 0);
            const minExp = parseFloat(expFilter);
            if (candidateExp < minExp) {
                return false;
            }
        }

        // Filter by Education/Marks
        if (eduFilter || marksFilter) {
            const edus = candidateEducations[app?.candidateId] || [];
            if (edus.length === 0) {
                return false;
            }
            const matches = edus.some(edu => {
                const matchesEdu = !eduFilter || (
                    (edu.educationType && edu.educationType.toLowerCase().includes(eduFilter.toLowerCase())) ||
                    (edu.specialization && edu.specialization.toLowerCase().includes(eduFilter.toLowerCase()))
                );

                const matchesGrade = !marksFilter || (
                    edu.grade && parseFloat(edu.grade) >= parseFloat(marksFilter)
                );

                return matchesEdu && matchesGrade;
            });
            if (!matches) {
                return false;
            }
        }

        return true;
    });

    return (

        <Box p={3}>

            <Typography variant="h4" mb={3}>
                {onlyShortlisted
                    ? "Shortlisted Candidates"
                    : "Received Applications"}
            </Typography>

            {/* Filters Section */}
            <Card sx={{ mb: 4, p: 2 }}>
                <Typography variant="h6" mb={2}>Filter Candidates</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Education/Degree"
                            variant="outlined"
                            placeholder="e.g. PG-DAC, Bachelor"
                            value={eduFilter}
                            onChange={(e) => setEduFilter(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Min Marks/Grade"
                            type="number"
                            inputProps={{ step: "0.1" }}
                            variant="outlined"
                            placeholder="e.g. 8.0, 75"
                            value={marksFilter}
                            onChange={(e) => setMarksFilter(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Min Experience (Years)"
                            type="number"
                            inputProps={{ step: "0.5" }}
                            variant="outlined"
                            placeholder="e.g. 2, 5"
                            value={expFilter}
                            onChange={(e) => setExpFilter(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Card>

            {
                filteredApplications.length === 0 ?

                    <Typography>
                        No Applications Found
                    </Typography>

                    :

                    filteredApplications.map(app => (

                        <Card
                            key={app.applicationId}
                            sx={{
                                mb: 3,
                                boxShadow: 3,
                                borderRadius: 3,
                                border: '1px solid #e0e0e0',
                                '&:hover': {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Grid container spacing={3}>
                                    {/* Left main area: Candidate info */}
                                    <Grid item xs={12} md={9}>
                                        {(() => {
                                            const candidate = candidateDetails[app?.candidateId];
                                            const user = candidate ? userDetails[candidate?.uid] : null;
                                            const educations = candidateEducations[app?.candidateId] || [];
                                            const skills = candidateSkills[app?.candidateId] || [];
                                            const projects = candidateProjects[app?.candidateId] || [];
                                            const certificates = candidateCertificates[app?.candidateId] || [];

                                            return (
                                                <Stack spacing={2}>
                                                    {/* Header info */}
                                                    <Box>
                                                        <Typography variant="h5" color="primary" fontWeight="bold">
                                                            {user?.name || "Loading..."}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                                                            {candidate?.gender || "-"} | Applied on: {new Date(app.applicationDate).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>

                                                    <Divider />

                                                    {/* Contact & Salaries */}
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="body2" mb={0.5}><strong>Email:</strong> {user?.email || "-"}</Typography>
                                                            <Typography variant="body2" mb={0.5}><strong>Phone:</strong> {user?.phone || "-"}</Typography>
                                                            <Typography variant="body2" mb={0.5}><strong>Address:</strong> {user?.address || "-"}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography variant="body2" mb={0.5}><strong>Experience:</strong> {candidate?.experience || 0} Years</Typography>
                                                            <Typography variant="body2" mb={0.5}><strong>Current Salary:</strong> ₹{candidate?.currentSalary || 0}</Typography>
                                                            <Typography variant="body2" mb={0.5}><strong>Expected Salary:</strong> ₹{candidate?.expectedSalary || 0}</Typography>
                                                        </Grid>
                                                    </Grid>

                                                    {candidate?.summary && (
                                                        <Box>
                                                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Professional Summary</Typography>
                                                            <Typography variant="body2" sx={{ fontStyle: 'italic', bgcolor: '#f9f9f9', p: 1.5, borderRadius: 1 }}>
                                                                "{candidate.summary}"
                                                            </Typography>
                                                        </Box>
                                                    )}

                                                    {/* Skills */}
                                                    {skills.length > 0 && (
                                                        <Box>
                                                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" mb={1}>Skills</Typography>
                                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
                                                                {skills.map((skill, idx) => (
                                                                    <Chip
                                                                        key={idx}
                                                                        label={`${skill.skillName} (${skill.proficiency || 'Intermediate'})`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        color="secondary"
                                                                    />
                                                                ))}
                                                            </Stack>
                                                        </Box>
                                                    )}

                                                    {/* Education */}
                                                    {educations.length > 0 && (
                                                        <Box>
                                                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" mb={0.5}>Education</Typography>
                                                            {educations.map((edu, idx) => (
                                                                <Typography key={idx} variant="body2" sx={{ pl: 2, borderLeft: '2px solid #ccc', py: 0.2, my: 0.5 }}>
                                                                    <strong>{edu.educationType || edu.specialization}</strong> from <em>{edu.universityName}</em> ({edu.duration || edu.passingYear}) — Grade: <strong>{edu.grade || "-"}</strong>
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    )}

                                                    {/* Projects */}
                                                    {projects.length > 0 && (
                                                        <Box>
                                                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" mb={0.5}>Projects</Typography>
                                                            {projects.map((proj, idx) => (
                                                                <Box key={idx} sx={{ pl: 2, borderLeft: '2px solid #90caf9', my: 1 }}>
                                                                    <Typography variant="body2">
                                                                        <strong>{proj.projectTitle}</strong>
                                                                        {proj.projectUrl && (
                                                                            <a href={proj.projectUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, fontSize: '0.8rem', color: '#1976d2', textDecoration: 'underline' }}>
                                                                                Project Link
                                                                            </a>
                                                                        )}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">{proj.description}</Typography>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    )}

                                                    {/* Certifications */}
                                                    {certificates.length > 0 && (
                                                        <Box>
                                                            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" mb={0.5}>Certifications</Typography>
                                                            {certificates.map((cert, idx) => (
                                                                <Typography key={idx} variant="body2" sx={{ pl: 2, borderLeft: '2px solid #a5d6a7', my: 0.5 }}>
                                                                    <strong>{cert.name}</strong> issued by <em>{cert.issuedBy}</em> ({cert.issueDate || "-"} to {cert.expiryDate || "-"})
                                                                </Typography>
                                                            ))}
                                                        </Box>
                                                    )}

                                                    {/* Resume Link */}
                                                    <Box display="flex" alignItems="center" mt={1}>
                                                        <Typography variant="body2" mr={1}><strong>Resume:</strong></Typography>
                                                        {app.resumeId ? (
                                                            <Button
                                                                size="small"
                                                                variant="contained"
                                                                color="info"
                                                                onClick={() => window.open(`http://localhost:8080/api/candidate/resume/view/${app.resumeId}`, "_blank")}
                                                                sx={{ textTransform: "none" }}
                                                            >
                                                                Open Resume
                                                            </Button>
                                                        ) : (
                                                            <Typography variant="body2" color="text.secondary">No resume uploaded</Typography>
                                                        )}
                                                    </Box>
                                                </Stack>
                                            );
                                        })()}
                                    </Grid>

                                    {/* Right actions area: Application status management */}
                                    <Grid item xs={12} md={3} display="flex" flexDirection="column" justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                                        <Box display="flex" flexDirection="column" alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                                            <Typography variant="caption" color="text.secondary" mb={1}>Current Status</Typography>
                                            <Chip
                                                label={app.statusName}
                                                color={
                                                    app.statusId === 4 ? "success" :
                                                        app.statusId === 5 ? "error" :
                                                            app.statusId === 2 ? "secondary" : "primary"
                                                }
                                                sx={{ mb: 2, fontWeight: 'bold' }}
                                            />
                                        </Box>

                                        <Box width="100%">
                                            <Typography variant="caption" color="text.secondary">Update Status</Typography>
                                            <Select
                                                fullWidth
                                                size="small"
                                                value={app.statusId}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        app.applicationId,
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ mt: 1, bgcolor: 'white' }}
                                            >
                                                <MenuItem value={1}>Applied</MenuItem>
                                                <MenuItem value={2}>Shortlisted</MenuItem>
                                                <MenuItem value={3}>Interview Scheduled</MenuItem>
                                                <MenuItem value={4}>Selected</MenuItem>
                                                <MenuItem value={5}>Rejected</MenuItem>
                                            </Select>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                    ))
            }

        </Box>

    );
};

export default ReceivedApplication;