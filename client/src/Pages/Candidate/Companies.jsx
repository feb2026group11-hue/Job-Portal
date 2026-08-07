import { useEffect, useState } from "react";
import { Container, Grid, Box, Typography, Paper, TextField, Chip, Button } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      // Fetch registered employers from the gateway on 8080
      const res = await axios.get("http://localhost:8080/api/employers");
      setCompanies(res.data);
    } catch (err) {
      console.error("Error loading companies list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 4 }}>
          Explore Verified Companies
        </Typography>

        {/* Search Panel */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: "1px solid #e2e8f0" }}>
          <TextField
            fullWidth
            label="Search companies by name or industry..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Paper>

        {/* Companies Grid */}
        {loading ? (
          <Typography variant="body1" sx={{ color: "#64748b" }}>Loading companies...</Typography>
        ) : filteredCompanies.length === 0 ? (
          <Typography variant="body1" sx={{ color: "#64748b", textAlign: "center", py: 8 }}>
            No companies found matching your search.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredCompanies.map((company) => (
              <Grid item xs={12} md={6} key={company.employerId}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)",
                    }
                  }}
                >
                  {/* Top Details */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                        <BusinessIcon sx={{ color: "#4f46e5" }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b" }}>
                          {company.companyName}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>
                        Reg ID: {company.registrationId}
                      </Typography>
                    </Box>
                    <Chip
                      label={company.industry}
                      size="small"
                      sx={{ color: "#6366f1", borderColor: "#c7d2fe", bgcolor: "#e0e7ff", fontWeight: 600 }}
                    />
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#475569",
                      mb: 3,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mt: 1,
                    }}
                  >
                    {company.description || "No description provided by the employer."}
                  </Typography>

                  {/* Metadata Row */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: "auto", pt: 2, borderTop: "1px solid #f1f5f9" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#64748b" }}>
                      <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {company.address ? `${company.address}, ${company.country}` : company.country}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#64748b" }}>
                      <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {company.email}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Companies;
