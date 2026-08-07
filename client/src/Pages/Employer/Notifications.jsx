import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import {
  getEmployerProfile,
  getEmployerJobs,
  getApplicationsByJob,
  getCandidateByCid,
  getUserById,
} from "../../app/EmployerSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.employerProfile.profile);

  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      if (!user?.uid) return;

      // 1. Get Employer Profile
      let employerId = profile?.employerId;
      if (!employerId) {
        const profRes = await dispatch(getEmployerProfile(user.uid)).unwrap();
        employerId = profRes?.employerId;
      }

      const loadedAlerts = [];

      // Add static/custom system alerts
      loadedAlerts.push(
        {
          id: "sys-emp-1",
          type: "system",
          title: "Complete Company Profile",
          message: "Ensure your company details are up to date to attract high-quality candidates.",
          timestamp: new Date(Date.now() - 3600000 * 3), // 3 hours ago
          read: false,
          severity: "info",
        },
        {
          id: "sys-emp-2",
          type: "system",
          title: "Security Update",
          message: "Please secure your employer account by verifying your email address and phone number.",
          timestamp: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
          read: true,
          severity: "warning",
        }
      );

      if (employerId) {
        // 2. Fetch all jobs for employer
        const jobsRes = await dispatch(getEmployerJobs(employerId)).unwrap();
        const jobs = Array.isArray(jobsRes) ? jobsRes : [];

        // 3. For each job, fetch applications
        const allApplications = [];
        for (const job of jobs) {
          try {
            const apps = await dispatch(getApplicationsByJob(job.jobId)).unwrap();
            if (Array.isArray(apps)) {
              apps.forEach(app => {
                allApplications.push({ ...app, jobTitle: job.title });
              });
            }
          } catch (err) {
            console.error(`Error fetching applications for job ${job.jobId}:`, err);
          }
        }

        // 4. For each application, resolve candidate and user name
        for (const app of allApplications) {
          let candidateName = `Candidate #${app.candidateId}`;
          try {
            const candRes = await dispatch(getCandidateByCid(app.candidateId)).unwrap();
            if (candRes?.uid) {
              const userRes = await dispatch(getUserById(candRes.uid)).unwrap();
              if (userRes?.name) {
                candidateName = userRes.name;
              }
            }
          } catch (err) {
            console.error(`Error fetching candidate details for application ${app.applicationId}:`, err);
          }

          const appDate = app.applicationDate ? new Date(app.applicationDate) : new Date();

          // Generate application notification
          loadedAlerts.push({
            id: `app-recv-${app.applicationId}`,
            type: "application",
            title: "New Application Received",
            message: `${candidateName} has applied for your job opening: "${app.jobTitle}".`,
            timestamp: appDate,
            read: false,
            severity: "success",
          });

          // Shortlisted notification
          if (app.statusId === 3) {
            loadedAlerts.push({
              id: `app-short-${app.applicationId}`,
              type: "application",
              title: "Candidate Shortlisted",
              message: `You shortlisted ${candidateName} for "${app.jobTitle}".`,
              timestamp: new Date(appDate.getTime() + 1800000), // Mock 30 mins after
              read: true,
              severity: "info",
            });
          }

          // Selected notification
          if (app.statusId === 5) {
            loadedAlerts.push({
              id: `app-sel-${app.applicationId}`,
              type: "application",
              title: "Candidate Selected",
              message: `${candidateName} has been selected and marked hired for "${app.jobTitle}"!`,
              timestamp: new Date(appDate.getTime() + 3600000), // Mock 1 hr after
              read: true,
              severity: "success",
            });
          }
        }
      }

      // Sort by newest timestamp
      loadedAlerts.sort((a, b) => b.timestamp - a.timestamp);

      // Load read/unread state from localStorage if exists
      const localReadState = JSON.parse(localStorage.getItem(`read_notifications_${user.uid}`) || "{}");
      const mappedAlerts = loadedAlerts.map(alert => ({
        ...alert,
        read: localReadState[alert.id] !== undefined ? localReadState[alert.id] : alert.read
      }));

      setNotifications(mappedAlerts);
    } catch (err) {
      console.error("Error loading employer notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const handleMarkAsRead = (id) => {
    const updated = notifications.map((n) => {
      if (n.id === id) return { ...n, read: true };
      return n;
    });
    setNotifications(updated);

    const localReadState = JSON.parse(localStorage.getItem(`read_notifications_${user.uid}`) || "{}");
    localReadState[id] = true;
    localStorage.setItem(`read_notifications_${user.uid}`, JSON.stringify(localReadState));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);

    const localReadState = JSON.parse(localStorage.getItem(`read_notifications_${user.uid}`) || "{}");
    notifications.forEach((n) => {
      localReadState[n.id] = true;
    });
    localStorage.setItem(`read_notifications_${user.uid}`, JSON.stringify(localReadState));
  };

  const handleDeleteNotification = (id) => {
    const filtered = notifications.filter((n) => n.id !== id);
    setNotifications(filtered);

    const localReadState = JSON.parse(localStorage.getItem(`read_notifications_${user.uid}`) || "{}");
    localReadState[id] = true;
    localStorage.setItem(`read_notifications_${user.uid}`, JSON.stringify(localReadState));
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "success":
        return <CheckCircleOutlineIcon sx={{ color: "#10b981" }} />;
      case "error":
        return <CancelOutlinedIcon sx={{ color: "#ef4444" }} />;
      case "warning":
        return <ErrorOutlineIcon sx={{ color: "#f59e0b" }} />;
      default:
        return <InfoOutlinedIcon sx={{ color: "#3b82f6" }} />;
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 0) return true; // All
    if (activeTab === 1) return n.type === "application";
    if (activeTab === 2) return n.type === "system";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const timeAgo = (dateObj) => {
    const seconds = Math.floor((new Date() - dateObj) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) return `${interval}y ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}mo ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m ago`;
    return "just now";
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
              Notifications & Alerts
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} New`}
                size="small"
                sx={{ bgcolor: "#ef4444", color: "#ffffff", fontWeight: 700 }}
              />
            )}
          </Box>
          {unreadCount > 0 && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleMarkAllRead}
              startIcon={<MarkEmailReadOutlinedIcon />}
              sx={{ color: "#4f46e5", borderColor: "#c7d2fe", borderRadius: 2 }}
            >
              Mark all as read
            </Button>
          )}
        </Box>

        <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", overflow: "hidden", mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newVal) => setActiveTab(newVal)}
            sx={{
              borderBottom: "1px solid #f1f5f9",
              px: 3,
              pt: 1.5,
              "& .MuiTabs-indicator": { bgcolor: "#4f46e5" },
            }}
          >
            <Tab label="All" sx={{ fontWeight: 600, textTransform: "none", py: 2 }} />
            <Tab label="Applications" sx={{ fontWeight: 600, textTransform: "none", py: 2 }} />
            <Tab label="System Alerts" sx={{ fontWeight: 600, textTransform: "none", py: 2 }} />
          </Tabs>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress size={32} />
            </Box>
          ) : filteredNotifications.length === 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyCenter: "center", py: 8, color: "#94a3b8" }}>
              <NotificationsIcon sx={{ fontSize: 48, mb: 1.5, color: "#cbd5e1" }} />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>No notifications found</Typography>
              <Typography variant="body2">We will notify you when something important happens.</Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredNotifications.map((notif) => (
                <ListItem
                  key={notif.id}
                  secondaryAction={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {!notif.read && (
                        <IconButton size="small" onClick={() => handleMarkAsRead(notif.id)} title="Mark as read">
                          <MarkEmailReadOutlinedIcon sx={{ fontSize: 18, color: "#6366f1" }} />
                        </IconButton>
                      )}
                      <IconButton size="small" onClick={() => handleDeleteNotification(notif.id)} title="Delete">
                        <DeleteOutlineIcon sx={{ fontSize: 18, color: "#94a3b8" }} />
                      </IconButton>
                    </Box>
                  }
                  sx={{
                    px: 4,
                    py: 2.5,
                    borderBottom: "1px solid #f1f5f9",
                    bgcolor: notif.read ? "transparent" : "#f5f3ff",
                    transition: "background-color 0.2s",
                    "&:hover": { bgcolor: notif.read ? "#f8fafc" : "#ede9fe" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getSeverityIcon(notif.severity)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                        <Typography sx={{ fontWeight: notif.read ? 600 : 700, color: "#1e293b" }}>
                          {notif.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          • {timeAgo(notif.timestamp)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "#475569", pr: 8 }}>
                        {notif.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Notifications;
