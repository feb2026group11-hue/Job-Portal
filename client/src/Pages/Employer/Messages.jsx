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

  // Load Contacts (Shortlisted Candidates)
  const loadContacts = async () => {
    try {
      if (!user?.uid) return;

      // 1. Fetch employer profile to get employerId (empid)
      const empRes = await axios.get(`http://localhost:8080/api/employers/user/${user.uid}`, { headers });
      const empid = empRes.data?.employerId;
      if (!empid) {
        setContacts([]);
        setLoadingContacts(false);
        return;
      }

      // 2. Fetch all jobs posted by this employer
      const jobsRes = await axios.get(`http://localhost:8080/api/jobs/employer/${empid}`, { headers });
      const jobs = jobsRes.data || [];
      if (jobs.length === 0) {
        setContacts([]);
        setLoadingContacts(false);
        return;
      }

      // 3. For each job, fetch applications
      const appPromises = jobs.map(job =>
        axios.get(`http://localhost:8080/api/applications/job/${job.jobId}`, { headers })
          .then(res => (res.data || []).map(app => ({ ...app, jobTitle: job.title })))
          .catch(() => [])
      );
      const allApps = (await Promise.all(appPromises)).flat();

      // 4. Filter for shortlisted / interview / selected applications (status 3, 4, 5)
      const shortlistedApps = allApps.filter(app => app.statusId === 3 || app.statusId === 4 || app.statusId === 5);
      if (shortlistedApps.length === 0) {
        setContacts([]);
        setLoadingContacts(false);
        return;
      }

      // 5. Fetch candidate profile and user details for each unique candidate
      const uniqueCandidates = [];
      const seenCids = new Set();

      for (const app of shortlistedApps) {
        if (seenCids.has(app.candidateId)) continue;
        seenCids.add(app.candidateId);

        try {
          // Fetch candidate profile to get uid
          const profileRes = await axios.get(`http://localhost:8080/candidate-profile/cid/${app.candidateId}`, { headers });
          const profileUid = profileRes.data?.uid;

          if (profileUid) {
            // Fetch candidate user details (name, email)
            const userRes = await axios.get(`http://localhost:8080/user/${profileUid}`, { headers });
            uniqueCandidates.push({
              uid: profileUid,
              name: userRes.data?.name || `Candidate #${app.candidateId}`,
              email: userRes.data?.email || "N/A",
              jobTitle: app.jobTitle,
              candidateId: app.candidateId
            });
          }
        } catch (candidateErr) {
          console.error(`Failed to fetch details for candidate ${app.candidateId}:`, candidateErr);
        }
      }

      setContacts(uniqueCandidates);
    } catch (err) {
      console.error("Error loading chat contacts for employer:", err);
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
        `http://localhost:8080/api/messages/history?user1=${user.uid}&user2=${contactUid}`,
        { headers }
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
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateTimeStr) => {
    if (!dateTimeStr) return "";
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "calc(100vh - 64px)", py: 4 }}>
      <Container maxWidth="xl" sx={{ height: "calc(100vh - 120px)" }}>
        <Paper
          elevation={0}
          sx={{
            height: "100%",
            display: "flex",
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            {/* Sidebar - Contacts List */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                borderRight: "1px solid #e2e8f0",
                display: { xs: showChatMobile ? "none" : "block", md: "block" },
                height: "100%",
              }}
            >
              <Box sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a", mb: 2 }}>
                  Messages
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search candidates or jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                <Divider sx={{ mb: 2 }} />

                {loadingContacts ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : filteredContacts.length === 0 ? (
                  <Box sx={{ textCenter: "center", py: 8, color: "#64748b", textAlign: "center" }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                    <Typography variant="body2">No active chats found.</Typography>
                    <Typography variant="caption" sx={{ display: "block", mt: 0.5 }}>
                      Candidates will appear here after they are shortlisted.
                    </Typography>
                  </Box>
                ) : (
                  <List sx={{ overflowY: "auto", flexGrow: 1, p: 0 }}>
                    {filteredContacts.map((contact) => {
                      const isSelected = selectedContact?.uid === contact.uid;
                      return (
                        <ListItem
                          button
                          key={contact.uid}
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowChatMobile(true);
                          }}
                          sx={{
                            borderRadius: 2.5,
                            mb: 1,
                            bgcolor: isSelected ? "#e0e7ff" : "transparent",
                            color: isSelected ? "#4f46e5" : "inherit",
                            "&:hover": {
                              bgcolor: isSelected ? "#e0e7ff" : "#f1f5f9",
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: isSelected ? "#4f46e5" : "#6366f1" }}>
                              {contact.name.charAt(0).toUpperCase()}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={contact.name}
                            secondary={
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                Applied: {contact.jobTitle}
                              </Typography>
                            }
                            primaryTypographyProps={{ fontWeight: 600, fontSize: "0.95rem" }}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Box>
            </Grid>

            {/* Chat Window */}
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                display: { xs: showChatMobile ? "flex" : "none", md: "flex" },
                flexDirection: "column",
                height: "100%",
                bgcolor: "#FFFFFF",
              }}
            >
              {selectedContact ? (
                <>
                  {/* Chat Header */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderBottom: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <IconButton
                      sx={{ display: { xs: "inline-flex", md: "none" } }}
                      onClick={() => setShowChatMobile(false)}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                    <Avatar sx={{ bgcolor: "#4f46e5" }}>
                      {selectedContact.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e293b" }}>
                        {selectedContact.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Job: {selectedContact.jobTitle} • {selectedContact.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Messages Area */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: "auto",
                      p: 3,
                      bgcolor: "#f8fafc",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {loadingMessages ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <CircularProgress size={28} />
                      </Box>
                    ) : messages.length === 0 ? (
                      <Box sx={{ m: "auto", textAlign: "center", color: "#64748b" }}>
                        <ChatBubbleOutlineIcon sx={{ fontSize: 40, mb: 1, opacity: 0.3 }} />
                        <Typography variant="body2">No messages yet. Send a message to start the conversation.</Typography>
                      </Box>
                    ) : (
                      messages.map((msg) => {
                        const isMine = msg.senderId === user.uid;
                        return (
                          <Box
                            key={msg.mid}
                            sx={{
                              alignSelf: isMine ? "flex-end" : "flex-start",
                              maxWidth: "70%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: isMine ? "flex-end" : "flex-start",
                            }}
                          >
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                borderRadius: isMine ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                                bgcolor: isMine ? "#4f46e5" : "#e2e8f0",
                                color: isMine ? "#FFFFFF" : "#1e293b",
                              }}
                            >
                              <Typography variant="body2">{msg.textMessage}</Typography>
                            </Paper>
                            <Typography variant="caption" sx={{ color: "#94a3b8", mt: 0.5, px: 0.5 }}>
                              {formatTime(msg.datetime)}
                            </Typography>
                          </Box>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </Box>

                  {/* Message Input Bar */}
                  <Box
                    component="form"
                    onSubmit={handleSendMessage}
                    sx={{
                      p: 2.5,
                      borderTop: "1px solid #e2e8f0",
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={!inputMessage.trim()}
                      sx={{
                        bgcolor: "#4f46e5",
                        color: "#FFFFFF",
                        borderRadius: 3,
                        px: 3,
                        py: 1,
                        "&:hover": {
                          bgcolor: "#4338ca",
                        },
                      }}
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    m: "auto",
                    textAlign: "center",
                    color: "#64748b",
                    p: 4,
                  }}
                >
                  <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 1 }}>
                    Your Conversation Hub
                  </Typography>
                  <Typography variant="body2" sx={{ maxWidth: 360 }}>
                    Select a shortlisted candidate from the sidebar list to view message history or start chatting.
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
