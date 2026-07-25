<<<<<<< HEAD
import { Link } from "react-router-dom";
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

const Home = () => {
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
                    />

                    <TextField
                      fullWidth
                      label="Location"
                    />

                    <Button
                      variant="contained"
                      size="large"
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

=======
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
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
   useEffect(() => {
      if (localStorage.getItem("Token")) {
        // navigate("/dashboard/home");
        navigate("/dashboard");
      }
    });
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
                    />

                    <TextField
                      fullWidth
                      label="Location"
                    />

                    <Button
                      variant="contained"
                      size="large"
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

>>>>>>> origin/main
export default Home;