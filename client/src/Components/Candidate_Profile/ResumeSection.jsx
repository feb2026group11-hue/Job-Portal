// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Stack,
// } from "@mui/material";

// const ResumeSection = () => {
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardContent>

//         <Typography
//           variant="h6"
//           fontWeight={700}
//           mb={2}
//         >
//           Resume
//         </Typography>

//         <Typography>
//           Resume_2026.pdf
//         </Typography>

//         <Typography color="text.secondary">
//           Uploaded: 10 June 2026
//         </Typography>

//         <Stack
//           direction="row"
//           spacing={2}
//           mt={2}
//         >
//           <Button variant="contained">
//             Download
//           </Button>

//           <Button variant="outlined">
//             Replace Resume
//           </Button>
//         </Stack>

//       </CardContent>
//     </Card>
//   );
// };

// export default ResumeSection;

import { Card, CardContent, Typography, Button, Stack, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { uploadResume } from "../../app/Authslice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AutoAwesome } from "@mui/icons-material";
import axios from "axios";

const ResumeSection = ({ cid, resumes, onRefresh }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [parsingAi, setParsingAi] = useState(false);

  const defaultResume = resumes && resumes.find(r => r.isDefault) || resumes?.[0];

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      await dispatch(
        uploadResume({
          cid,
          summary: "Java Full Stack Developer",
          isDefault: true,
          file,
        }),
      ).unwrap();

      toast.success("Resume Updated successfully");
      if (onRefresh) onRefresh();
    } catch (err) {
      toast.error("Resume upload failed");
    }
  };

  const handleAiResumeParse = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setParsingAi(true);
    const loadingToast = toast.loading("Extracting resume details with AI...");

    try {
      // Also save resume file to profile in background if cid exists
      if (cid) {
        try {
          await dispatch(
            uploadResume({
              cid,
              summary: "Parsed Resume",
              isDefault: true,
              file,
            })
          ).unwrap();
          if (onRefresh) onRefresh();
        } catch (e) { console.warn("Background resume save skipped:", e); }
      }

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      let res;
      try {
        res = await axios.post("http://localhost:8080/api/candidate/resume/parse-ai", formData, { headers });
      } catch (err) {
        console.warn("Gateway request failed, retrying candidate-profile-service directly...", err);
        res = await axios.post("http://localhost:8082/api/candidate/resume/parse-ai", formData, { headers });
      }

      toast.dismiss(loadingToast);
      toast.success("Resume parsed successfully! Review your extracted details.");

      navigate("/dashboard/candidate/review-resume", {
        state: { parsedData: res.data },
      });
    } catch (err) {
      console.error("AI Parse Error:", err);
      toast.dismiss(loadingToast);
      toast.error("Failed to parse resume with AI. Please try again.");
    } finally {
      setParsingAi(false);
    }
  };

  const handleViewResume = () => {
    if (!defaultResume) return;
    window.open(`http://localhost:8080/api/candidate/resume/view/${defaultResume.resumeId}`, "_blank");
  };

  const handleDownloadResume = () => {
    if (!defaultResume) return;
    window.open(`http://localhost:8080/api/candidate/resume/download/${defaultResume.resumeId}`, "_blank");
  };

  const getFileName = (path) => {
    if (!path) return "Resume.pdf";
    const lastSlash = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
    return path.substring(lastSlash + 1);
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Resume
        </Typography>

        {defaultResume ? (
          <>
            <Typography fontWeight={500}>{getFileName(defaultResume.file)}</Typography>
            {defaultResume.summary && (
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {defaultResume.summary}
              </Typography>
            )}
          </>
        ) : (
          <Typography color="text.secondary">No resume uploaded</Typography>
        )}

        <Stack direction="row" spacing={2} mt={2} flexWrap="wrap" gap={1}>
          <Button variant="contained" component="label">
            {defaultResume ? "Replace Resume" : "Upload Resume"}

            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </Button>

          <Button
            variant="contained"
            color="secondary"
            component="label"
            disabled={parsingAi}
            startIcon={parsingAi ? <CircularProgress size={18} color="inherit" /> : <AutoAwesome />}
            sx={{
              background: "linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)",
              color: "#fff",
              fontWeight: 700,
              "&:hover": {
                background: "linear-gradient(135deg, #6D28D9 0%, #A855F7 100%)",
              },
            }}
          >
            {parsingAi ? "Parsing Resume..." : "AI Auto-Fill Profile"}

            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleAiResumeParse}
            />
          </Button>

          {defaultResume && (
            <>
              <Button variant="outlined" onClick={handleViewResume}>
                View Resume
              </Button>
              <Button variant="outlined" onClick={handleDownloadResume}>
                Download Resume
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
