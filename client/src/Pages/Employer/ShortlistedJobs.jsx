import React, { useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployerJobs } from "../../app/EmployerSlice";

const ShortlistedJobs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector((state) => state.employerProfile.profile);
    const jobs = useSelector((state) => state.employerProfile.jobs);

    useEffect(() => {
        if (profile?.employerId) {
            dispatch(getEmployerJobs(profile.employerId));
        }
    }, [dispatch, profile]);

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>
                Select Job
            </Typography>

            <Grid container spacing={3}>
                {jobs.map((job) => (
                    <Grid item xs={12} md={6} key={job.jobId}>
                        <Card
                            sx={{
                                cursor: "pointer",
                                height: "100%",
                                transition: ".3s",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardContent>

                                <Typography variant="h6">
                                    {job.title}
                                </Typography>

                                <Typography color="text.secondary" mt={1}>
                                    {job.role}
                                </Typography>

                                <Typography mt={1}>
                                    {job.location}
                                </Typography>

                                <Typography mt={1}>
                                    {job.experience} Years Experience
                                </Typography>

                                <Typography mt={1}>
                                    ₹ {job.salary}
                                </Typography>

                                <Chip
                                    label={job.status}
                                    sx={{ mt: 2 }}
                                />

                                <Box mt={3}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/employer/shortlisted/${job.jobId}`
                                            )
                                        }
                                    >
                                        View Shortlisted Candidates
                                    </Button>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ShortlistedJobs;