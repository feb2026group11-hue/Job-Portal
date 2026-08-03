import React, { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    MenuItem,
    Select,
    Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
 
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getApplicationsByJob, getCandidateByCid, getUserById, updateApplicationStatus } from "../../app/EmployerSlice";

const ReceivedApplication = ({ onlyShortlisted = false }) => {

    const { jobId } = useParams();
    console.log(jobId)
    const dispatch = useDispatch();

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

                for (const app of res.payload) {

                    const candidateRes = await dispatch(
                        getCandidateByCid(app.candidateId)
                    );

                    if (getCandidateByCid.fulfilled.match(candidateRes)) {

                        await dispatch(
                            getUserById(candidateRes.payload.uid)
                        );

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

    return (

        <Box p={3}>

            <Typography variant="h4" mb={3}>
                {onlyShortlisted
                    ? "Shortlisted Candidates"
                    : "Received Applications"}
            </Typography>

            {
                displayedApplications.length === 0 ?

                    <Typography>
                        No Applications Found
                    </Typography>

                    :

                    displayedApplications.map(app => (

                        <Card
                            className="px-3 "
                            key={app.applicationId}
                            sx={{ mb: 2 }}
                        >

                            <CardContent>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >

                                    <Box>

                                        {/* <Typography variant="h6">
                                            Candidate #{app.candidateId}
                                        </Typography> */}
                                        {(() => {

                                            const candidate = candidateDetails[app?.candidateId];
                                            const user = candidate ? userDetails[candidate?.uid] : null;

                                            return (
                                                <>
                                                    <Typography variant="h6" className="text-primary fw-bold">
                                                        {user?.name || "Loading..."}
                                                    </Typography>

                                                    <Typography>
                                                        Email : {user?.email || "-"}
                                                    </Typography>

                                                    <Typography>
                                                        Phone : {user?.phone || "-"}
                                                    </Typography>

                                                    <Typography>
                                                        Address : {user?.address || "-"}
                                                    </Typography>

                                                    <Typography>
                                                        Gender : {candidate?.gender || "-"}
                                                    </Typography>

                                                    <Typography>
                                                        Experience : {candidate?.experience || 0} Years
                                                    </Typography>

                                                    <Typography>
                                                        Current Salary : ₹{candidate?.currentSalary || 0}
                                                    </Typography>

                                                    <Typography>
                                                        Expected Salary : ₹{candidate?.expectedSalary || 0}
                                                    </Typography>

                                                    <Typography>
                                                        Summary : {candidate?.summary || "-"}
                                                    </Typography>
                                                </>
                                            );

                                        })()}

                                        <Typography>
                                            Resume ID : {app.resumeId}
                                        </Typography>

                                        <Typography>
                                            Applied :
                                            {" "}
                                            {new Date(
                                                app.applicationDate
                                            ).toLocaleDateString()}
                                        </Typography>

                                        <Chip
                                            label={app.statusName}
                                            sx={{ mt: 1 }}
                                        />

                                    </Box>

                                    <Select
                                        size="small"
                                        value={app.statusId}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                app.applicationId,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <MenuItem value={1}>
                                            Applied
                                        </MenuItem>

                                        <MenuItem value={2}>
                                            Shortlisted
                                        </MenuItem>

                                        <MenuItem value={3}>
                                            Interview Scheduled
                                        </MenuItem>

                                        <MenuItem value={4}>
                                            Selected
                                        </MenuItem>

                                        <MenuItem value={5}>
                                            Rejected
                                        </MenuItem>

                                    </Select>

                                </Stack>

                            </CardContent>

                        </Card>

                    ))
            }

        </Box>

    );
};

export default ReceivedApplication;