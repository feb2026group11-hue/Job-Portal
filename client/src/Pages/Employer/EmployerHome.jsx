import React, { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Stack,
    Button,
    Chip,
    Divider,
} from "@mui/material";
import {
    Work,
    CheckCircle,
    Cancel,
    People,
    Add,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployerJobs, getEmployerProfile } from "../../app/EmployerSlice";

const EmployerHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector((state) => state.employerProfile?.profile);
    const user = useSelector((state) => state.auth?.user);
    const empProfile = useSelector((state) => state.employerProfile);
    const companyId = empProfile.profile?.employerId;
    console.log("companyId:" + companyId);
    // get all jobs
    const getJobs = async () => {
        const res = await dispatch(getEmployerJobs(companyId));
        console.log("res:" + res.payload);
    }
    // getJobs();
    const jobs = useSelector(
        state => state.employerProfile.jobs
    );
    console.log(jobs);

    useEffect(() => {
        if (user?.uid) {
            dispatch(getEmployerProfile(user.uid));
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (companyId) {
            getJobs();
        }
    }, [dispatch, companyId]);

    const totalJobs = jobs?.length || 0;

    const openJobs =
        jobs?.filter((job) => job.status === "Open").length || 0;

    const closedJobs =
        jobs?.filter((job) => job.status === "Closed").length || 0;

    return (
        <Box p={3}>

            <Typography variant="h4" fontWeight={700}>
                Hello, {profile?.companyName || profile?.name || "Employer"} 👋
            </Typography>

            <Typography color="text.secondary" mb={4}>
                Welcome back! Here's an overview of your hiring activity.
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">
                                <Work color="primary" fontSize="large" />
                                <Typography variant="h4">{totalJobs}</Typography>
                                <Typography color="text.secondary">
                                    Total Jobs
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">
                                <CheckCircle color="success" fontSize="large" />
                                <Typography variant="h4">{openJobs}</Typography>
                                <Typography color="text.secondary">
                                    Open Jobs
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">
                                <Cancel color="error" fontSize="large" />
                                <Typography variant="h4">{closedJobs}</Typography>
                                <Typography color="text.secondary">
                                    Closed Jobs
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Stack spacing={1} alignItems="center">
                                <People color="warning" fontSize="large" />
                                <Typography variant="h4">0</Typography>
                                <Typography color="text.secondary">
                                    Applicants
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <Card sx={{ mt: 5 }}>
                <CardContent>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography variant="h6">
                            Recent Job Posts
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => navigate("/employer/post-job")}
                        >
                            Post Job
                        </Button>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    {jobs?.length > 0 ? (
                        jobs.slice(0, 5).map((job) => (
                            <Box
                                key={job.jobId}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    py: 2,
                                }}
                            >
                                <Box>
                                    <Typography fontWeight={600}>
                                        {job.title}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {job.location} • {job.experience} Years
                                    </Typography>
                                </Box>

                                <Chip
                                    label={job.status}
                                    color={
                                        job.status === "Open"
                                            ? "success"
                                            : "default"
                                    }
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography color="text.secondary">
                            No jobs posted yet.
                        </Typography>
                    )}

                </CardContent>
            </Card>

            <Card sx={{ mt: 4 }}>
                <CardContent>

                    <Typography variant="h6" mb={2}>
                        Quick Actions
                    </Typography>

                    <Stack direction="row" spacing={2}>

                        <Button
                            variant="contained"
                            onClick={() => navigate("/dashboard/employer/post-job")}
                        >
                            Post New Job
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/employer/jobs")}
                        >
                            Manage Jobs
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => navigate("/dashboard/employer-profile")}
                        >
                            Employer Profile
                        </Button>

                    </Stack>

                </CardContent>
            </Card>

        </Box>
    );
};

export default EmployerHome;