import React, { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteJob, getEmployerJobs, updateJobStatus } from "../../app/EmployerSlice";

const ManageJobs = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const empProfile = useSelector((state) => state.employerProfile);
    const empid = Number(
        empProfile?.profile?.employerId ||
        localStorage.getItem("employerId")
    );

    const jobs = useSelector(
        state => state.employerProfile.jobs
    );
    // console.log("jobs", jobs);
    useEffect(() => {
        dispatch(getEmployerJobs(empid));
    }, [dispatch]);

    const handleStatusChange = async (job) => {

        const newStatus = job.status === "Open" ? "Closed" : "Open";

        const res = await dispatch(
            updateJobStatus({
                jobId: job.jobId,
                status: newStatus,
            })
        );

        if (updateJobStatus.fulfilled.match(res)) {
            toast.success(`Job ${newStatus}`);
        } else {
            toast.error("Failed to update status");
        }
    };

    return (

        <Box p={3}>

            <Stack
                direction="row"
                justifyContent="space-between"
                mb={3}
            >
                <Typography variant="h4">
                    Manage Jobs
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/dashboard/employer/post-job")}
                >
                    Post Job
                </Button>

            </Stack>
            <Grid container spacing={3}>
                {
                    jobs?.length === 0 ? (

                        <Typography>
                            No Jobs Found
                        </Typography>

                    ) :

                        jobs?.map(job => (
                            <Grid item xs={12} md={6} key={job.jobId}>

                                <Card
                                    key={job.jobId}
                                    sx={{ mb: 2 }}
                                >

                                    <CardContent>

                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >

                                            <Box>

                                                <Typography
                                                    variant="h6"
                                                >
                                                    {job.title}
                                                </Typography>

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    {job.role}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                >
                                                    {job.location}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                >
                                                    ₹ {job.salary}
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                >
                                                    {job.experience} Years
                                                </Typography>

                                                <Chip
                                                    label={job.status}
                                                    color={
                                                        job.status === "Open"
                                                            ? "success"
                                                            : "default"
                                                    }
                                                    sx={{ mt: 1 }}
                                                />

                                            </Box>

                                            <Stack
                                                spacing={2}
                                            >

                                                <Button
                                                    variant="outlined"
                                                    startIcon={<EditIcon />}
                                                    onClick={() =>
                                                        navigate(
                                                            `/employer/edit-job/${job.jobId}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    color={job.status === "Open" ? "error" : "success"}
                                                    onClick={() => handleStatusChange(job)}
                                                >
                                                    {job.status === "Open" ? "Close Job" : "Open Job"}
                                                </Button>

                                            </Stack>

                                        </Stack>

                                    </CardContent>

                                </Card>
                            </Grid>

                        ))
                }
            </Grid>

        </Box>
    );
};

export default ManageJobs;