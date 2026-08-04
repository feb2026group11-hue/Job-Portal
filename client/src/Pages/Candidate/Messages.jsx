import { useEffect, useState, useRef } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useSelector } from "react-redux";

const Messages = () => {
  const user = useSelector((state) => state.auth.user);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mobile responsive state for showing active chat
  const [showChatMobile, setShowChatMobile] = useState(false);

  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Load Contacts
  const loadContacts = async () => {
    try {
      if (!user?.uid) return;

      // 1. Fetch candidate profile to get cid
      const profileRes = await axios.get(`http://localhost:8080/candidate-profile/${user.uid}`, { headers });
      const cid = profileRes.data?.cid;
      if (!cid) {
        setContacts([]);
        setLoadingContacts(false);
        return;
      }

      // 2. Fetch all applications of this candidate
      const appRes = await axios.get(`http://localhost:8080/api/applications/candidate/${cid}`, { headers });
      const apps = appRes.data || [];

      // 3. Filter for shortlisted / interview / selected applications (status 3, 4, 5)
      const shortlistedApps = apps.filter(app => app.statusId === 3 || app.statusId === 4 || app.statusId === 5);
      if (shortlistedApps.length === 0) {
        setContacts([]);
        setLoadingContacts(false);
        return;
      }

      // 4. For each application, fetch job to get employerId (empid)
      const uniqueJobIds = [...new Set(shortlistedApps.map(app => app.jobId))];
      const jobPromises = uniqueJobIds.map(jobId => 
        axios.get(`http://localhost:8080/api/jobs/${jobId}`, { headers })
          .then(res => res.data)
          .catch(() => null)
      );
      const jobs = (await Promise.all(jobPromises)).filter(Boolean);

      // 5. Fetch employer profiles for these jobs to get their companyName and uid
      const uniqueEmployerIds = [...new Set(jobs.map(job => job.empId || job.employerId || job.empid))].filter(Boolean);
      const employerPromises = uniqueEmployerIds.map(empId =>
        axios.get(`http://localhost:8080/api/employers/${empId}`, { headers })
          .then(res => res.data)
          .catch(() => null)
      );
      const employers = (await Promise.all(employerPromises)).filter(Boolean);

      // 6. Map contacts format
      const validContacts = employers.map(emp => ({
        ...emp,
        uid: emp.uid || emp.userId, // User ID for messaging
        companyName: emp.companyName || "Company"
      }));

      setContacts(validContacts);
    } catch (err) {
      console.error("Error loading chat contacts for candidate:", err);
      setContacts([]);
    } finally {
      setLoadingContacts(false);
    }
  };

  // Load Message History
  const loadMessageHistory = async (contactUid) => {
    if (!user?.uid || !contactUid) return;
    try {
      const res = await axios.get(
        `http://localhost:8080/api/messages/history?user1=${user.uid}&user2=${contactUid}`
      );
      // Sort messages by datetime
      const sortedMessages = (res.data || []).sort(
        (a, b) => new Date(a.datetime) - new Date(b.datetime)
      );
      setMessages(sortedMessages);
    } catch (err) {
      console.error("Error loading message history:", err);
    }
  };

  useEffect(() => {
    loadContacts();
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Poll for new messages when contact is selected
  useEffect(() => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    if (selectedContact) {
      setLoadingMessages(true);
      loadMessageHistory(selectedContact.uid).then(() => {
        setLoadingMessages(false);
        scrollToBottom();
      });

      pollingRef.current = setInterval(() => {
        loadMessageHistory(selectedContact.uid);
      }, 3000);
    } else {
      setMessages([]);
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [selectedContact]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || !selectedContact) return;

    const messagePayload = {
      senderId: user.uid,
      receiverId: selectedContact.uid,
      textMessage: inputMessage.trim(),
    };

    try {
      const res = await axios.post("http://localhost:8080/api/messages", messagePayload, { headers });
      setMessages((prev) => [...prev, res.data]);
      setInputMessage("");
      setTimeout(scrollToBottom, 50);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    try {
      const d = new Date(dateTimeStr);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "90vh", py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a", mb: 3 }}>
          Messages
        </Typography>

        <Paper
          elevation={0}
          sx={{
            height: "75vh",
            display: "flex",
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            {/* Sidebar List - Left side */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                borderRight: "1px solid #e2e8f0",
                display: { xs: showChatMobile ? "none" : "flex", md: "flex" },
                flexDirection: "column",
                height: "100%",
                bgcolor: "#ffffff",
              }}
            >
              {/* Sidebar Header with Search */}
              <Box sx={{ p: 2, borderBottom: "1px solid #f1f5f9" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#f8fafc",
                    },
                  }}
                />
              </Box>

              {/* Contacts List */}
              <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                {loadingContacts ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress size={28} />
                  </Box>
                ) : filteredContacts.length === 0 ? (
                  <Typography variant="body2" sx={{ color: "#64748b", textAlign: "center", mt: 4 }}>
                    No companies found.
                  </Typography>
                ) : (
                  <List sx={{ p: 0 }}>
                    {filteredContacts.map((contact) => {
                      const isSelected = selectedContact?.uid === contact.uid;
                      return (
                        <ListItem
                          button
                          key={contact.employerId}
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowChatMobile(true);
                          }}
                          sx={{
                            py: 2,
                            px: 3,
                            borderBottom: "1px solid #f8fafc",
                            bgcolor: isSelected ? "#e0e7ff" : "transparent",
                            transition: "background-color 0.2s",
                            "&:hover": {
                              bgcolor: isSelected ? "#e0e7ff" : "#f1f5f9",
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: isSelected ? "#4f46e5" : "#6366f1" }}>
                              {contact.companyName.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography sx={{ fontWeight: 600, color: "#1e293b" }}>
                                {contact.companyName}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ color: "#64748b" }}>
                                {contact.industry}
                              </Typography>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Box>
            </Grid>

            {/* Chat Area - Right side */}
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: { xs: showChatMobile ? "flex" : "none", md: "flex" },
                flexDirection: "column",
                height: "100%",
                bgcolor: "#f8fafc",
              }}
            >
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      px: 3,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "1px solid #e2e8f0",
                      borderRadius: 0,
                      bgcolor: "#ffffff",
                    }}
                  >
                    <IconButton
                      onClick={() => setShowChatMobile(false)}
                      sx={{ mr: 1, display: { xs: "inline-flex", md: "none" } }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Avatar sx={{ bgcolor: "#4f46e5", mr: 2 }}>
                      {selectedContact.companyName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                        {selectedContact.companyName}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#64748b" }}>
                        {selectedContact.email}
                      </Typography>
                    </Box>
                  </Paper>

                  {/* Message History Feed */}
                  <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                    {loadingMessages ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress size={24} />
                      </Box>
                    ) : messages.length === 0 ? (
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94a3b8",
                        }}
                      >
                        <ChatBubbleOutlineIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">No messages yet. Send a message to start.</Typography>
                      </Box>
                    ) : (
                      messages.map((msg) => {
                        const isSentByMe = msg.senderId === user.uid;
                        return (
                          <Box
                            key={msg.msgid}
                            sx={{
                              display: "flex",
                              justifyContent: isSentByMe ? "flex-end" : "flex-start",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                maxWidth: "70%",
                                px: 2.5,
                                py: 1.5,
                                borderRadius: isSentByMe ? "16px 16px 0px 16px" : "16px 16px 16px 0px",
                                bgcolor: isSentByMe ? "#4f46e5" : "#ffffff",
                                color: isSentByMe ? "#ffffff" : "#1e293b",
                                border: isSentByMe ? "none" : "1px solid #e2e8f0",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                              }}
                            >
                              <Typography variant="body2">{msg.textMessage}</Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  textAlign: "right",
                                  mt: 0.5,
                                  color: isSentByMe ? "rgba(255,255,255,0.7)" : "#94a3b8",
                                  fontSize: "0.65rem",
                                }}
                              >
                                {formatTime(msg.datetime)}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </Box>

                  {/* Chat Input Footer */}
                  <Box
                    component="form"
                    onSubmit={handleSendMessage}
                    sx={{ p: 2, bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0" }}
                  >
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        autoComplete="off"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: "#f8fafc",
                          },
                        }}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          borderRadius: 3,
                          bgcolor: "#4f46e5",
                          px: 3,
                          "&:hover": { bgcolor: "#4338ca" },
                        }}
                      >
                        <SendIcon />
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                  }}
                >
                  <ChatBubbleOutlineIcon sx={{ fontSize: 56, mb: 1.5, color: "#cbd5e1" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#64748b", mb: 0.5 }}>
                    Your Inbox
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    Select a company from the list to start chatting.
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Messages;
