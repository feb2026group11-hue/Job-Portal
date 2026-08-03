import React, { useState } from "react";
import { styled, Paper, List, ListItemButton, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MuiIconButton, MuiInputBase } from "../../../MUIComponents/Mui";
import { useTheme } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";
import "../../Css/DashboardAll.css";

const SearchComponent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [openSuggestions, setOpenSuggestions] = useState(false);

  const getSearchableRoutes = (upperRole) => {
    let dashboardTabs = [];
    let widgetTabs = [];
    let applicationTabs = [];

    if (upperRole === "ADMIN") {
      dashboardTabs = [
        { title: "Admin Dashboard", path: "/dashboard/admin/home" }
      ];
      widgetTabs = [
        { title: "All Users", path: "/dashboard/admin/users" },
        { title: "Employer Verification", path: "/dashboard/admin/verify-employers" },
        { title: "Verify Job Posts", path: "/dashboard/admin/verify-jobs" },
        { title: "Manage Categories", path: "/dashboard/admin/categories" }
      ];
      applicationTabs = [
        { title: "Reports & Analytics", path: "/dashboard/admin/reports" },
        { title: "System Notifications", path: "/dashboard/admin/notifications" },
        { title: "Global Settings", path: "/dashboard/admin/settings" }
      ];
    } else if (upperRole === "EMPLOYER") {
      dashboardTabs = [
        { title: "Dashboard", path: "/dashboard/employer/home" }
      ];
      widgetTabs = [
        { title: "Post a New Job", path: "/dashboard/employer/post-job" },
        { title: "Manage Job Posts", path: "/dashboard/employer/manage-job" },
        { title: "Received Applications", path: "/dashboard/employer/job-applications" },
        { title: "Shortlisted / Interviews", path: "/dashboard/employer/shortlisted-jobs" }
      ];
      applicationTabs = [
        { title: "Company Profile", path: "/dashboard/employer-profile" },
        { title: "Messages", path: "/dashboard/employer/messages" },
        { title: "Notifications", path: "/dashboard/employer/notifications" },
        { title: "Settings", path: "/dashboard/employer/settings" }
      ];
    } else {
      // CANDIDATE
      dashboardTabs = [
        { title: "Dashboard", path: "/dashboard/candidate/home" }
      ];
      widgetTabs = [
        { title: "Browse Jobs", path: "/dashboard/candidate/jobs" },
        { title: "Saved Jobs", path: "/dashboard/candidate/saved-jobs" },
        { title: "Applied Jobs", path: "/dashboard/candidate/applied-jobs" }
      ];
      applicationTabs = [
        { title: "My Profile", path: "/dashboard/candidate-profile" },
        { title: "Upload Resume", path: "/dashboard/candidate/upload-resume" },
        { title: "Companies", path: "/dashboard/candidate/companies" },
        { title: "Messages", path: "/dashboard/candidate/messages" },
        { title: "Notifications & Alerts", path: "/dashboard/candidate/notifications" },
        { title: "Settings", path: "/dashboard/candidate/settings" }
      ];
    }

    return [...dashboardTabs, ...widgetTabs, ...applicationTabs];
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const role = localStorage.getItem("role")?.toUpperCase();
    const routes = getSearchableRoutes(role);

    const filtered = routes.filter(route =>
      route.title.toLowerCase().includes(value.toLowerCase()) ||
      route.path.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        navigate(suggestions[0].path);
        setOpenSuggestions(false);
        setQuery("");
      }
    }
  };

  const handleSelectSuggestion = (path) => {
    navigate(path);
    setOpenSuggestions(false);
    setQuery("");
  };

  const handleBlur = () => {
    setTimeout(() => {
      setOpenSuggestions(false);
    }, 200);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: "rgb(248, 250, 252)",
    border: "1px solid #d6d6c2",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "rgb(248, 250, 252)",
      border: "1.6px solid black",
    },
    "&:focus-within": {
      backgroundColor: "rgb(248, 250, 252)",
      border: "1.6px solid #3296f3",
    },
    marginRight: theme.spacing(1),
    marginLeft: 5,
    width: "60%",
    [theme.breakpoints.down("md")]: {
      marginRight: theme.spacing(-1),
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1.5),
      width: "100%",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0.5),
    },
  }));

  const TuneIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0.5),
    },
  }));

  const StyledInputBase = styled(MuiInputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%", // the input spans the full width
    "& .MuiInputBase-input": {
      padding: theme.spacing(1.5, 1.5, 1.5, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      paddingRight: `calc(1em + ${theme.spacing(4)})`,
      transition: "all .3s ease-out",
      width: "100%", // the input spans the full width
      [theme.breakpoints.down("md")]: {
        paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
        paddingRight: `calc(1em + ${theme.spacing(0.5)})`,
        "&::placeholder": {
          fontSize: "small",
          padding: `calc(1em + ${theme.spacing(0.1)})`,
        },
        padding: theme.spacing(1, 1, 1, 1),
      },
      [theme.breakpoints.up("md")]: {
        "&:focus": {
          width: "100%", // Ethe input spans the full width on focus
          border: "1px solid #3296f3",
          borderRadius: "5px",
        },
      },
    },
  }));

  return (
    <>
      <Search
        className="searchbg"
        sx={{
          [theme.breakpoints.down("md")]: {},
          [theme.breakpoints.down("sm")]: {
            display: "none",
            width: "150%",
          },
        }}
      >
        <SearchIconWrapper>
          <SearchIcon
            className="searchtext"
            sx={{
              [theme.breakpoints.down("md")]: {
                width: "16px",
              },
            }}
          />
        </SearchIconWrapper>
        <StyledInputBase
          className="searchtext"
          sx={{ fontWeight: 500 }}
          placeholder="Search routes & paths..."
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpenSuggestions(true)}
          onBlur={handleBlur}
        />
        {openSuggestions && suggestions.length > 0 && (
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 1400,
              mt: 1,
              maxHeight: 250,
              overflowY: "auto",
              borderRadius: 2,
              border: "1px solid #e0e0e0"
            }}
          >
            <List disablePadding>
              {suggestions.map((route, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => handleSelectSuggestion(route.path)}
                  sx={{
                    py: 1,
                    px: 2,
                    borderBottom: idx !== suggestions.length - 1 ? "1px solid #f0f0f0" : "none",
                    "&:hover": {
                      bgcolor: "#f5f5f5"
                    }
                  }}
                >
                  <ListItemText
                    primary={route.title}
                    secondary={route.path}
                    primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500, color: "black" }}
                    secondaryTypographyProps={{ fontSize: "0.75rem", color: "text.secondary" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
        <TuneIconWrapper>
          <MuiIconButton
            className="AppBarIconBtn1"
            size="small"
            sx={{
              borderRadius: "25%",
              my: 2,
            }}
          >
            <TuneIcon
              className="AppBarIcon1"
              sx={{
                color: "#1976d2",
                fontSize: "medium",
                [theme.breakpoints.down("md")]: {
                  width: "15px",
                  height: "15px",
                },
              }}
            />
          </MuiIconButton>
        </TuneIconWrapper>
      </Search>
    </>
  );
};

export default SearchComponent;
