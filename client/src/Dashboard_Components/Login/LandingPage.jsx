import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";

import {
  Building2,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";
import { MuiAvatar } from "../../MUIComponents/Mui";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/jobs");
        const openJobs = res.data.filter(j => j.status?.toLowerCase() === "open" || j.status?.toLowerCase() === "active");
        setJobsList(openJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    setHasSearched(true);
    const filtered = jobsList.filter(job => {
      const matchQuery = !searchQuery || 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchLocation = !searchLocation || 
        job.location?.toLowerCase().includes(searchLocation.toLowerCase());

      return matchQuery && matchLocation;
    });
    setSearchResults(filtered);
  };
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {/* Navbar */}
      <nav
        className="border-bottom sticky-top bg-white"
        style={{ zIndex: 1000 }}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-center py-3">
            <Typography
              variant="h4"
              fontWeight="bold"
              className="d-flex gap-3 align-items-center"
              style={{color:"rgb(2 88 205)"}}
            >
              <MuiAvatar alt="App Logo" src="/assets/Logo/logo-job-portal.webp" sx={{ width: 50, height: 50 }}/>
              <span style={{color:"black",padding:0}}>Job</span>Portal
            </Typography>

            <div className="d-flex gap-2">
              <Button
                component={Link}
                to="/login"
                variant="outlined"
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/signup"
                variant="contained"
              >
                Register
              </Button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero */}
      <Container className="py-5">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <span
              className="px-3 py-2 rounded-pill"
              style={{
                background: "#dbeafe",
                color: "#2563eb",
                fontWeight: 500,
              }}
            >
              India's Trusted Job Portal
            </span>

            <Typography
              variant="h3"
              fontWeight="bold"
              mt={4}
              mb={3}
            >
              Find Your Dream Job{" "}
              <span style={{ color: "#2563eb" }}>
                Faster
              </span>
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
            >
              Connect with top companies, discover
              opportunities, and take the next step in
              your career journey.
            </Typography>

            <div className="d-flex gap-3 mt-4">
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={18} />}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
              >
                Login
              </Button>
            </div>
          </Col>

          <Col lg={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg,#eff6ff,#ffffff)",
              }}
            >
              <Card elevation={0}>
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Search Jobs
                  </Typography>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    mt={3}
                  >
                    <TextField
                      fullWidth
                      label="Job title, skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <TextField
                      fullWidth
                      label="Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleSearch}
                    >
                      Search Jobs
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Col>
        </Row>
      </Container>

      {/* Jobs Search Results / Featured Jobs */}
      <Container className="py-5">
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          {hasSearched ? `Search Results (${searchResults.length})` : "Featured Jobs"}
        </Typography>

        <Row className="g-4">
          {(hasSearched ? searchResults : jobsList.slice(0, 3)).length === 0 ? (
            <Col xs={12} className="text-center py-5">
              <Typography color="text.secondary" variant="h6">
                No jobs found. Try adjusting your search keywords.
              </Typography>
            </Col>
          ) : (
            (hasSearched ? searchResults : jobsList.slice(0, 3)).map((job) => (
              <Col key={job.jobId} md={4}>
                <Card className="h-100 shadow-sm d-flex flex-column justify-content-between" sx={{ borderRadius: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                      <Typography variant="h6" fontWeight="bold" color="primary.main">
                        {job.title}
                      </Typography>
                      <span
                        className="badge"
                        style={{
                          background: job.type === "FT" || job.type === "Full-time" ? "#dcfce7" : "#fef9c3",
                          color: job.type === "FT" || job.type === "Full-time" ? "#166534" : "#854d0e",
                          fontSize: "0.75rem",
                          padding: "6px 10px",
                          borderRadius: "12px",
                        }}
                      >
                        {job.type === "FT" ? "Full Time" : job.type === "PT" ? "Part Time" : job.type}
                      </span>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: "60px", overflow: "hidden" }}>
                      {job.description}
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography variant="body2" color="text.primary">
                        📍 <strong>Location:</strong> {job.location}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        💼 <strong>Experience:</strong> {job.experience} Yrs
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        💰 <strong>Salary:</strong> ₹{job.salary} LPA
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box p={2} pt={0}>
                    <Button
                      fullWidth
                      variant="outlined"
                      component={Link}
                      to="/login"
                      sx={{ borderRadius: "8px" }}
                    >
                      Login to Apply
                    </Button>
                  </Box>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Stats */}
      <section
        className="py-5"
        style={{ background: "rgb(76 83 100)" }}
      >
        <Container>
          <Row className="text-center text-white">
            <Col md={3}>
              <h2>10K+</h2>
              <p>Jobs Posted</p>
            </Col>

            <Col md={3}>
              <h2>500+</h2>
              <p>Companies</p>
            </Col>

            <Col md={3}>
              <h2>25K+</h2>
              <p>Candidates</p>
            </Col>

            <Col md={3}>
              <h2>95%</h2>
              <p>Success Rate</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <Typography variant="h3" fontWeight="bold">
            Why Choose Us
          </Typography>

          <Typography color="text.secondary" mt={2}>
            Everything you need to find your perfect
            career opportunity.
          </Typography>
        </div>

        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <CardContent>
                <Search color="#2563eb" size={40} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Smart Job Search
                </Typography>
                <Typography color="text.secondary">
                  Discover jobs that match your skills
                  and experience.
                </Typography>
              </CardContent>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <CardContent>
                <Building2 color="#2563eb" size={40} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Top Companies
                </Typography>
                <Typography color="text.secondary">
                  Connect with leading employers across
                  industries.
                </Typography>
              </CardContent>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <CardContent>
                <Users color="#2563eb" size={40} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  Career Growth
                </Typography>
                <Typography color="text.secondary">
                  Build your professional profile and
                  grow your career.
                </Typography>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "#2563eb" }}
      >
        <Container>
          <Typography
            variant="h3"
            fontWeight="bold"
          >
            Ready to Start Your Career Journey?
          </Typography>

          <Typography mt={2}>
            Join thousands of professionals finding
            their dream jobs.
          </Typography>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#fff",
              color: "#2563eb",
            }}
          >
            Create Account
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer
        className="py-3 text-center"
        style={{
          background: "rgb(76 83 100)",
          color: "#ccd4df",
        }}
      >
        © 2026 JobPortal. All Rights Reserved.
      </footer>
    </Box>
  );
};

export default Home;