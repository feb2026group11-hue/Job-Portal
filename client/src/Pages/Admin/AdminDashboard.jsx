import React, { useEffect, useState } from "react";
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  People,
  Business,
  Group,
  Security,
  Refresh,
  Search,
  PersonOutline,
  WorkOutline,
  CheckCircle,
  AdminPanelSettings,
  TrendingUp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserCounts, FetchAllUsers } from "../../app/Authslice";
import axios from "axios";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const userCounts = useSelector((state) => state.auth?.userCounts) || {
    candidateCount: 0,
    employerCount: 0,
    totalUsers: 0,
    adminCount: 0,
  };
  const allUsers = useSelector((state) => state.auth?.allUsers) || [];
  const loading = useSelector((state) => state.auth?.loading);

  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [citiesMap, setCitiesMap] = useState({});

  const loadCities = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/cities");
      const map = {};
      res.data.forEach((city) => {
        map[city.cid] = city.cname;
      });
      setCitiesMap(map);
    } catch (err) {
      console.error("Error loading cities:", err);
    }
  };

  const loadData = () => {
    dispatch(FetchUserCounts());
    dispatch(FetchAllUsers());
    loadCities();
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const candidateCount = userCounts.candidateCount || 0;
  const employerCount = userCounts.employerCount || 0;
  const totalUsers = userCounts.totalUsers || 0;
  const adminCount = userCounts.adminCount || 0;

  const candidatePercentage = totalUsers > 0 ? Math.round((candidateCount / totalUsers) * 100) : 0;
  const employerPercentage = totalUsers > 0 ? Math.round((employerCount / totalUsers) * 100) : 0;

  // Filter users based on tab & search query
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.includes(searchQuery);

    if (!matchesSearch) return false;

    if (activeTab === "CANDIDATE") return u.role?.toUpperCase() === "CANDIDATE";
    if (activeTab === "EMPLOYER") return u.role?.toUpperCase() === "EMPLOYER";
    if (activeTab === "ADMIN") return u.role?.toUpperCase() === "ADMIN";
    return true;
  });

  const getRoleChipColor = (role) => {
    switch (role?.toUpperCase()) {
      case "CANDIDATE":
        return { color: "info", bg: "#e0f2fe", text: "#0369a1" };
      case "EMPLOYER":
        return { color: "success", bg: "#dcfce7", text: "#15803d" };
      case "ADMIN":
        return { color: "secondary", bg: "#f3e8ff", text: "#7e22ce" };
      default:
        return { color: "default", bg: "#f1f5f9", text: "#475569" };
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Top Welcome Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} color="#0f172a">
            Admin Dashboard 👋
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Welcome back, {user?.name || "System Admin"}! Here is your portal overview.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Chip
            icon={<CheckCircle color="success" />}
            label="System Online"
            variant="outlined"
            sx={{ fontWeight: 600, borderColor: "#cbd5e1", backgroundColor: "#ffffff" }}
          />
          <Tooltip title="Refresh Dashboard Stats">
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={loadData}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              }}
            >
              Refresh Data
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {loading && <LinearProgress sx={{ mb: 3, borderRadius: 2 }} />}

      {/* Main Metric Cards */}
      <Grid container spacing={3} mb={4}>
        {/* Candidate Count Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.05)",
              border: "1px solid #e2e8f0",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
              transition: "transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.15)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "#e0f2fe",
                    color: "#0284c7",
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                  }}
                >
                  <People fontSize="large" />
                </Avatar>
                <Chip
                  icon={<TrendingUp style={{ color: "#0284c7" }} />}
                  label={`${candidatePercentage}%`}
                  size="small"
                  sx={{ backgroundColor: "#e0f2fe", color: "#0284c7", fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="h3" fontWeight={800} color="#0f172a">
                {candidateCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600} mt={0.5}>
                Total Candidates
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Employer Count Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 8px 10px -6px rgba(16, 185, 129, 0.05)",
              border: "1px solid #e2e8f0",
              background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
              transition: "transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.15)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "#dcfce7",
                    color: "#16a34a",
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                  }}
                >
                  <Business fontSize="large" />
                </Avatar>
                <Chip
                  icon={<TrendingUp style={{ color: "#16a34a" }} />}
                  label={`${employerPercentage}%`}
                  size="small"
                  sx={{ backgroundColor: "#dcfce7", color: "#16a34a", fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="h3" fontWeight={800} color="#0f172a">
                {employerCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600} mt={0.5}>
                Total Employers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.05)",
              border: "1px solid #e2e8f0",
              background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
              transition: "transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.15)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "#e0e7ff",
                    color: "#4f46e5",
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                  }}
                >
                  <Group fontSize="large" />
                </Avatar>
                <Chip
                  label="All Roles"
                  size="small"
                  sx={{ backgroundColor: "#e0e7ff", color: "#4f46e5", fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="h3" fontWeight={800} color="#0f172a">
                {totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600} mt={0.5}>
                Total System Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* System Admins Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.1), 0 8px 10px -6px rgba(168, 85, 247, 0.05)",
              border: "1px solid #e2e8f0",
              background: "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
              transition: "transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.15)",
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    bgcolor: "#f3e8ff",
                    color: "#9333ea",
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                  }}
                >
                  <Security fontSize="large" />
                </Avatar>
                <Chip
                  label="Admin"
                  size="small"
                  sx={{ backgroundColor: "#f3e8ff", color: "#9333ea", fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="h3" fontWeight={800} color="#0f172a">
                {adminCount}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600} mt={0.5}>
                System Administrators
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Distribution Analytics Card */}
      <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", mb: 4, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} color="#0f172a" mb={1}>
            User Ratio Breakdown
          </Typography>
          <Typography color="text.secondary" variant="body2" mb={3}>
            Distribution ratio of registered Candidates versus Employers on the portal.
          </Typography>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box mb={2}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography fontWeight={600} color="#0284c7">
                    Candidates ({candidateCount})
                  </Typography>
                  <Typography fontWeight={600} color="#0284c7">
                    {candidatePercentage}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={candidatePercentage}
                  sx={{ height: 10, borderRadius: 5, backgroundColor: "#e0f2fe", "& .MuiLinearProgress-bar": { backgroundColor: "#0284c7" } }}
                />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography fontWeight={600} color="#16a34a">
                    Employers ({employerCount})
                  </Typography>
                  <Typography fontWeight={600} color="#16a34a">
                    {employerPercentage}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={employerPercentage}
                  sx={{ height: 10, borderRadius: 5, backgroundColor: "#dcfce7", "& .MuiLinearProgress-bar": { backgroundColor: "#16a34a" } }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} justifyContent={{ xs: "flex-start", md: "center" }}>
                <Box
                  p={2}
                  sx={{
                    textAlign: "center",
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    minWidth: 140,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    CANDIDATE RATIO
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="#0284c7">
                    {candidatePercentage}%
                  </Typography>
                </Box>

                <Box
                  p={2}
                  sx={{
                    textAlign: "center",
                    borderRadius: "12px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    minWidth: 140,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    EMPLOYER RATIO
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="#16a34a">
                    {employerPercentage}%
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* User Management Section */}
      <Card sx={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)" }}>
        <CardContent sx={{ p: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            mb={3}
          >
            <Box>
              <Typography variant="h6" fontWeight={700} color="#0f172a">
                Registered Users Directory
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage candidate and employer accounts across the platform.
              </Typography>
            </Box>

            <TextField
              placeholder="Search by name, email or phone..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: "100%", sm: 300 }, backgroundColor: "#ffffff" }}
            />
          </Stack>

          {/* Filter Tabs */}
          <Stack direction="row" spacing={1} mb={3}>
            {[
              { label: `All (${totalUsers})`, val: "ALL" },
              { label: `Candidates (${candidateCount})`, val: "CANDIDATE" },
              { label: `Employers (${employerCount})`, val: "EMPLOYER" },
              { label: `Admins (${adminCount})`, val: "ADMIN" },
            ].map((tab) => (
              <Button
                key={tab.val}
                variant={activeTab === tab.val ? "contained" : "outlined"}
                onClick={() => setActiveTab(tab.val)}
                size="small"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Table */}
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #f1f5f9", borderRadius: "12px" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#475569" }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#475569" }}>City / Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => {
                    const chipStyle = getRoleChipColor(u.role);
                    return (
                      <TableRow key={u.uid} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell sx={{ fontWeight: 600, color: "#64748b" }}>#{u.uid}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#0f172a" }}>
                          <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: chipStyle.bg, color: chipStyle.text, fontSize: "0.85rem", fontWeight: 700 }}>
                              {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>
                              {u.name || "N/A"}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ color: "#334155" }}>{u.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={u.role || "N/A"}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              backgroundColor: chipStyle.bg,
                              color: chipStyle.text,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "#475569" }}>{u.phone || "N/A"}</TableCell>
                        <TableCell sx={{ color: "#475569" }}>
                          {[citiesMap[u.city] || u.city, u.country].filter(Boolean).join(", ") || "N/A"}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#64748b" }}>
                      No registered users found matching the selected filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
