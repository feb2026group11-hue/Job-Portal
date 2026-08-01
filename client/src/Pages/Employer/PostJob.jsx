import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createJob } from "../../app/EmployerSlice";
import { Loader } from "lucide-react";

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    role: Yup.string().required("Role is required"),
    experience: Yup.number()
        .required("Experience is required")
        .min(0, "Invalid Experience"),
    salary: Yup.number()
        .required("Salary is required")
        .min(1, "Invalid Salary"),
    location: Yup.string().required("Location is required"),
    state: Yup.number().required("State is required"),
    city: Yup.number().required("City is required"),
    type: Yup.string().required("Job Type is required"),
});

const PostJob = () => {
    const dispatch = useDispatch();
    const empProfile = useSelector((state) => state.employerProfile);
    const companyId = Number(
        empProfile?.profile?.employerId ||
        localStorage.getItem("employerId")
    );
    console.log("Company ID:", companyId);
    const initialValues = {
        empId: companyId,
        title: "",
        description: "",
        role: "",
        experience: "",
        salary: "",
        location: "",
        state: 1,
        city: 1,
        type: "",
    };

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {

            const payload = {
                ...values,
                status: "Open",
            };
            console.log("Payload:", payload);
            const result = await dispatch(createJob(payload));
            console.log("Result:", result);
            if (createJob.fulfilled.match(result)) {
                toast.success("Job Posted Successfully");
                resetForm();
            } else {
                toast.error(result.payload || "Failed to post job");
            }

        } catch (err) {
            console.log("Error:", err);
            toast.error("Something went wrong");
        }

        setSubmitting(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
                mb: 5,
            }}
        >
            <Card className="p-3 shadow-sm rounded" sx={{ width: 900 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Post New Job
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Job Title"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.title && Boolean(errors.title)}
                                            helperText={touched.title && errors.title}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Role"
                                            name="role"
                                            value={values.role}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.role && Boolean(errors.role)}
                                            helperText={touched.role && errors.role}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Experience (Years)"
                                            name="experience"
                                            value={values.experience}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.experience &&
                                                Boolean(errors.experience)
                                            }
                                            helperText={
                                                touched.experience &&
                                                errors.experience
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Salary"
                                            name="salary"
                                            value={values.salary}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.salary && Boolean(errors.salary)}
                                            helperText={touched.salary && errors.salary}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Location"
                                            name="location"
                                            value={values.location}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.location &&
                                                Boolean(errors.location)
                                            }
                                            helperText={
                                                touched.location &&
                                                errors.location
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="State"
                                            name="state"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.state && Boolean(errors.state)}
                                            helperText={touched.state && errors.state}
                                        >
                                            <MenuItem value={1}>Maharashtra</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="City"
                                            name="city"
                                            value={values.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.city && Boolean(errors.city)}
                                            helperText={touched.city && errors.city}
                                        >
                                            <MenuItem value={1}>Pune</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Job Type"
                                            name="type"
                                            value={values.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.type && Boolean(errors.type)}
                                            helperText={touched.type && errors.type}
                                        >
                                            <MenuItem value="Full Time">
                                                Full Time
                                            </MenuItem>
                                            <MenuItem value="Part Time">
                                                Part Time
                                            </MenuItem>
                                            <MenuItem value="Internship">
                                                Internship
                                            </MenuItem>
                                            <MenuItem value="Contract">
                                                Contract
                                            </MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={6}
                                            label="Job Description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.description &&
                                                Boolean(errors.description)
                                            }
                                            helperText={
                                                touched.description &&
                                                errors.description
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            loading={isSubmitting}
                                            variant="contained"
                                            type="submit"
                                            size="large"
                                        >
                                            {isSubmitting ? <Loader /> : "Post Job"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PostJob;