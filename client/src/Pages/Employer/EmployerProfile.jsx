import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Spinner,
    Alert,
    Badge,
} from "react-bootstrap";
import {
    Building,
    User as UserIcon,
    Mail,
    Phone,
    MapPin,
    FileText,
    Briefcase,
    Edit,
    Globe,
    CheckCircle,
    AlertCircle,
    Hash,
} from "lucide-react";
import {
    getEmployerProfile,
    updateEmployerProfile,
    updateUser,
} from "../../app/EmployerSlice";
import { GetUser } from "../../app/Authslice";

const EmployerProfile = () => {
    const dispatch = useDispatch();

    // Get auth user from state
    const user = useSelector((state) => state.auth?.user);
    // console.log(user);
    // Get employer state
    const employerState = useSelector(
        (state) => state.employer || state.employerProfile || {}
    );
    const { profile, loading, error } = employerState;

    // Local component state
    const [showModal, setShowModal] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // Fetch employer profile when user UID is available
    useEffect(() => {
        if (user?.uid) {
            dispatch(getEmployerProfile(user.uid));
        }
    }, [dispatch, user?.uid]);

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        // Company Validation
        companyName: Yup.string().required("Company Name is required"),
        email: Yup.string()
            .email("Enter a valid email address")
            .required("Company Email is required"),
        registrationId: Yup.string().required("Registration ID is required"),
        industry: Yup.string().required("Industry is required"),
        country: Yup.string().required("Country is required"),
        description: Yup.string().nullable(),
        address: Yup.string().nullable(),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),

        // User Validation
        userName: Yup.string().required("User Name is required"),
        userEmail: Yup.string()
            .email("Enter a valid email address")
            .required("User Email is required"),
        phone: Yup.string().required("Phone number is required"),
        userAddress: Yup.string().nullable(),
        userCountry: Yup.string().required("Country is required"),
    });

    // Modal initial values derived from current profile and auth user
    const getInitialFormValues = () => ({
        companyName: profile?.companyName || "",
        email: profile?.email || "",
        registrationId: profile?.registrationId || "",
        industry: profile?.industry || "",
        description: profile?.description || "",
        address: profile?.address || "",
        city: profile?.city !== undefined && profile?.city !== null ? profile.city : "",
        state: profile?.state !== undefined && profile?.state !== null ? profile.state : "",
        country: profile?.country || "India",

        userName: user?.name || "",
        userEmail: user?.email || "",
        phone: user?.phone || "",
        userAddress: user?.address || "",
        userCity: user?.city !== undefined && user?.city !== null ? user.city : "",
        userState: user?.state !== undefined && user?.state !== null ? user.state : "",
        userCountry: user?.country || "India",
    });

    // Save handler for Formik
    const handleSaveProfile = async (values, { setSubmitting }) => {
        setModalError(null);
        setSuccessMsg(null);

        try {
            // 1. Prepare Employer Profile Data
            const profileData = {
                companyName: values.companyName,
                email: values.email,
                registrationId: values.registrationId,
                industry: values.industry,
                description: values.description,
                address: values.address,
                city: isNaN(values.city) ? values.city : Number(values.city),
                state: isNaN(values.state) ? values.state : Number(values.state),
                country: values.country,
                userId: user?.uid,
                employerId: profile?.employerId,
            };

            // 2. First API: Update Employer Profile
            await dispatch(
                updateEmployerProfile({
                    employerId: profile?.employerId,
                    profileData,
                })
            ).unwrap();

            // 3. Prepare User Data
            const userData = {
                name: values.userName,
                email: values.userEmail,
                phone: values.phone,
                address: values.userAddress,
                city: isNaN(values.userCity || values.city)
                    ? values.userCity || values.city
                    : Number(values.userCity || values.city),
                state: isNaN(values.userState || values.state)
                    ? values.userState || values.state
                    : Number(values.userState || values.state),
                country: values.userCountry || values.country,
                role: user?.role || "EMPLOYER",
            };

            // 4. Second API: Update User
            // await dispatch(
            //     updateUser({
            //         uid: user?.uid,
            //         userData,
            //     })
            // ).unwrap();

            // 5. Success Flow: Close Modal, Refresh Profile, Show Success Notification
            setShowModal(false);
            if (user?.uid) {
                dispatch(getEmployerProfile(user.uid));
                if (typeof GetUser === "function") {
                    dispatch(GetUser());
                }
            }
            setSuccessMsg("Employer profile and account details updated successfully!");
        } catch (err) {
            console.error("Failed to update profile:", err);
            const errorText =
                typeof err === "string"
                    ? err
                    : err?.message ||
                    err?.error ||
                    "An error occurred while saving. Please check your data and try again.";
            setModalError(errorText);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container fluid className="py-4 px-3 px-md-4">
            {/* Page Header */}
            <Card className="border-0 shadow-sm mb-4 rounded-3 bg-white">
                <Card.Body className="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <h2 className="fw-bold mb-0 text-dark">Employer Profile</h2>
                            <Badge bg="primary" className="px-2 py-1 fs-7">
                                {user?.role || "EMPLOYER"}
                            </Badge>
                        </div>
                        <p className="text-muted mb-0">
                            Manage your company information and employer account details
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="d-flex align-items-center justify-content-center gap-2 px-4 py-2 rounded-2 fw-semibold shadow-sm"
                        onClick={() => {
                            setModalError(null);
                            setShowModal(true);
                        }}
                    >
                        <Edit size={18} /> Edit Profile
                    </Button>
                </Card.Body>
            </Card>

            {/* Success Notification */}
            {successMsg && (
                <Alert
                    variant="success"
                    dismissible
                    onClose={() => setSuccessMsg(null)}
                    className="d-flex align-items-center gap-2 mb-4 shadow-sm"
                >
                    <CheckCircle size={20} />
                    <div>{successMsg}</div>
                </Alert>
            )}

            {/* Loading Spinner */}
            {loading && !profile && (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading profile...</span>
                    </Spinner>
                    <p className="text-muted mt-3 fw-medium">Loading Employer Profile...</p>
                </div>
            )}

            {/* Error Banner if API fails */}
            {error && !profile && !loading && (
                <Alert variant="danger" className="d-flex align-items-center gap-2 mb-4">
                    <AlertCircle size={20} />
                    <div>{typeof error === "string" ? error : "Failed to load employer profile."}</div>
                </Alert>
            )}

            {/* Main Content Grid */}
            <Row className="g-4">
                {/* Company Section */}
                <Col lg={7} xl={8}>
                    <Card className="border-0 shadow-sm rounded-3 h-100 bg-white">
                        <Card.Header className="bg-white border-bottom py-3 px-4 d-flex align-items-center gap-2">
                            <Building className="text-primary" size={22} />
                            <h5 className="fw-bold mb-0 text-dark">Company Information</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {/* Company Logo Placeholder */}
                            <div className="d-flex align-items-center gap-4 mb-4 pb-4 border-bottom">
                                <div className="text-center">
                                    <div
                                        className="rounded-circle bg-light border border-2 border-primary d-flex align-items-center justify-content-center mx-auto shadow-sm"
                                        style={{ width: "90px", height: "90px" }}
                                    >
                                        <Building size={42} className="text-primary" />
                                    </div>
                                    <small className="text-muted d-block mt-2 fw-medium">
                                        Coming Soon
                                    </small>
                                </div>
                                <div>
                                    <h3 className="fw-bold text-dark mb-1">
                                        {profile?.companyName || "Company Name Not Set"}
                                    </h3>
                                    <Badge bg="info" className="text-dark fw-semibold px-3 py-1">
                                        {profile?.industry || "Industry N/A"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Company Details Grid */}
                            <Row className="g-3">
                                <Col md={6}>
                                    <div className="p-3 bg-light rounded-3 border-0">
                                        <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                            <Mail size={15} /> Company Email
                                        </div>
                                        <div className="fw-semibold text-dark text-break">
                                            {profile?.email || "N/A"}
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="p-3 bg-light rounded-3 border-0">
                                        <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                            <Hash size={15} /> Registration ID
                                        </div>
                                        <div className="fw-semibold text-dark">
                                            {profile?.registrationId || "N/A"}
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="p-3 bg-light rounded-3 border-0">
                                        <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                            <Briefcase size={15} /> Industry
                                        </div>
                                        <div className="fw-semibold text-dark">
                                            {profile?.industry || "N/A"}
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="p-3 bg-light rounded-3 border-0">
                                        <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                            <Globe size={15} /> Country
                                        </div>
                                        <div className="fw-semibold text-dark">
                                            {profile?.country || "N/A"}
                                        </div>
                                    </div>
                                </Col>

                                <Col md={12}>
                                    <div className="p-3 bg-light rounded-3 border-0">
                                        <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                            <FileText size={15} /> Description
                                        </div>
                                        <div className="fw-normal text-dark">
                                            {profile?.description || "No description provided."}
                                        </div>
                                    </div>
                                </Col>

                                <Col md={12}>
                                    <div className="p-3 bg-light rounded-3 border-0">
                                        <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                            <MapPin size={15} /> Company Address
                                        </div>
                                        <div className="fw-semibold text-dark">
                                            {profile?.address || "N/A"}
                                        </div>
                                        <div className="text-muted small mt-1">
                                            City: <span className="fw-semibold text-dark">{profile?.city ?? "N/A"}</span> | State: <span className="fw-semibold text-dark">{profile?.state ?? "N/A"}</span> | Country: <span className="fw-semibold text-dark">{profile?.country || "N/A"}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                {/* User Section */}
                <Col lg={5} xl={4}>
                    <Card className="border-0 shadow-sm rounded-3 h-100 bg-white">
                        <Card.Header className="bg-white border-bottom py-3 px-4 d-flex align-items-center gap-2">
                            <UserIcon className="text-primary" size={22} />
                            <h5 className="fw-bold mb-0 text-dark">
                                Employer Account Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <div className="text-center mb-4 pb-3 border-bottom">
                                <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm fs-3 fw-bold"
                                    style={{ width: "70px", height: "70px" }}
                                >
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "E"}
                                </div>
                                <h5 className="fw-bold text-dark mb-0">{user?.name || "N/A"}</h5>
                                <small className="text-muted">{user?.email || "N/A"}</small>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                <div className="p-3 bg-light rounded-3">
                                    <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                        <UserIcon size={15} /> Name
                                    </div>
                                    <div className="fw-semibold text-dark">{user?.name || "N/A"}</div>
                                </div>

                                <div className="p-3 bg-light rounded-3">
                                    <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                        <Mail size={15} /> Email
                                    </div>
                                    <div className="fw-semibold text-dark text-break">
                                        {user?.email || "N/A"}
                                    </div>
                                </div>

                                <div className="p-3 bg-light rounded-3">
                                    <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                        <Phone size={15} /> Phone
                                    </div>
                                    <div className="fw-semibold text-dark">{user?.phone || "N/A"}</div>
                                </div>

                                <div className="p-3 bg-light rounded-3">
                                    <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                        <MapPin size={15} /> Address
                                    </div>
                                    <div className="fw-semibold text-dark">
                                        {user?.address || "N/A"}
                                    </div>
                                    <div className="text-muted small mt-1">
                                        City: <span className="fw-semibold text-dark">{user?.city ?? "N/A"}</span> | State: <span className="fw-semibold text-dark">{user?.state ?? "N/A"}</span> | Country: <span className="fw-semibold text-dark">{user?.country || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Edit Profile Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
                backdrop="static"
                className="m-5"

            >
                <Modal.Header closeButton className="border-bottom px-4 py-3">
                    <Modal.Title className="fw-bold d-flex align-items-center gap-2 text-dark fs-5">
                        <Edit className="text-primary" size={20} /> Edit Employer Profile
                    </Modal.Title>
                </Modal.Header>

                <Formik
                    initialValues={getInitialFormValues()}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={handleSaveProfile}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        isSubmitting,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body className="p-4" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                                {modalError && (
                                    <Alert variant="danger" className="d-flex align-items-center gap-2 mb-4">
                                        <AlertCircle size={18} />
                                        <div>{modalError}</div>
                                    </Alert>
                                )}

                                {/* Section 1: Company Details */}
                                <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
                                    <Building size={18} /> Company Details
                                </h6>
                                <Row className="g-3 mb-4">
                                    <Col md={6}>
                                        <Form.Group controlId="companyName">
                                            <Form.Label className="fw-semibold small">
                                                Company Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="companyName"
                                                value={values.companyName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.companyName && !!errors.companyName}
                                                placeholder="Enter company name"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.companyName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Label className="fw-semibold small">
                                                Company Email <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.email && !!errors.email}
                                                placeholder="hr@company.com"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="registrationId">
                                            <Form.Label className="fw-semibold small">
                                                Registration ID <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="registrationId"
                                                value={values.registrationId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.registrationId && !!errors.registrationId}
                                                placeholder="e.g. CIN-U72900MH2026PTC123456"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.registrationId}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="industry">
                                            <Form.Label className="fw-semibold small">
                                                Industry <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="industry"
                                                value={values.industry}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.industry && !!errors.industry}
                                                placeholder="e.g. Information Technology"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.industry}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="description">
                                            <Form.Label className="fw-semibold small">
                                                Description <span className="text-muted">(Optional)</span>
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="description"
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.description && !!errors.description}
                                                placeholder="Brief overview of the company..."
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="address">
                                            <Form.Label className="fw-semibold small">
                                                Company Address <span className="text-muted">(Optional)</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.address && !!errors.address}
                                                placeholder="Street / Area address"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.address}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="country">
                                            <Form.Label className="fw-semibold small">
                                                Country <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="country"
                                                value={values.country}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.country && !!errors.country}
                                                placeholder="Country"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.country}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="city">
                                            <Form.Label className="fw-semibold small">
                                                City <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.city && !!errors.city}
                                                placeholder="City ID or Name"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.city}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="state">
                                            <Form.Label className="fw-semibold small">
                                                State <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="state"
                                                value={values.state}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.state && !!errors.state}
                                                placeholder="State ID or Name"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.state}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Section 2: User Account Details */}
                                <h6 className="fw-bold text-primary mb-3 pb-2 border-bottom d-flex align-items-center gap-2">
                                    <UserIcon size={18} /> User Account Details
                                </h6>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group controlId="userName">
                                            <Form.Label className="fw-semibold small">
                                                User Name <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="userName"
                                                value={values.userName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.userName && !!errors.userName}
                                                placeholder="Full Name"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.userName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="userEmail">
                                            <Form.Label className="fw-semibold small">
                                                User Email <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="userEmail"
                                                value={values.userEmail}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.userEmail && !!errors.userEmail}
                                                placeholder="user@example.com"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.userEmail}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="phone">
                                            <Form.Label className="fw-semibold small">
                                                Phone <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.phone && !!errors.phone}
                                                placeholder="Phone Number"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="userCountry">
                                            <Form.Label className="fw-semibold small">
                                                User Country <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="userCountry"
                                                value={values.userCountry}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.userCountry && !!errors.userCountry}
                                                placeholder="User Country"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.userCountry}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group controlId="userAddress">
                                            <Form.Label className="fw-semibold small">
                                                User Address <span className="text-muted">(Optional)</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="userAddress"
                                                value={values.userAddress}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.userAddress && !!errors.userAddress}
                                                placeholder="User Address"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.userAddress}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Modal.Body>

                            <Modal.Footer className="px-4 py-3 border-top">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowModal(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
};

export default EmployerProfile;
