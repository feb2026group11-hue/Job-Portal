import React, { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerJobs } from "../../app/EmployerSlice";
import { useNavigate } from "react-router-dom";

const JobApplications = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jobs = useSelector(
        state => state.employerProfile.jobs
    );

    const employerId = useSelector(
        state => state.employerProfile.profile?.employerId
    );

    useEffect(() => {

        if (employerId) {
            dispatch(getEmployerJobs(employerId));
        }

    }, [dispatch, employerId]);

    return (

        <Box p={3}>

            <Typography
                variant="h4"
                mb={3}
            >
                Select Job
            </Typography>

            {
                jobs?.map(job => (

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

                                    <Typography variant="h6">
                                        {job.title}
                                    </Typography>

                                    <Typography>
                                        {job.location}
                                    </Typography>

                                    <Typography>
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

                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/employer/applications/${job.jobId}`
                                        )
                                    }
                                >
                                    View Applications
                                </Button>

                            </Stack>

                        </CardContent>

                    </Card>

                ))
            }

        </Box>
    );
};

export default JobApplications;