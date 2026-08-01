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

import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { uploadResume } from "../../app/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getResume } from "../../app/CandidateProfileSlice";

const ResumeSection = ({ cid, resumes, onRefresh }) => {
  const dispatch = useDispatch();

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

  const handleViewResume = () => {
    if (!defaultResume) return;
    window.open(`http://localhost:8082/api/candidate/resume/download/${defaultResume.resumeId}`, "_blank");
  };

  const getFileName = (path) => {
    if (!path) return "Resume.pdf";
    return path.substring(path.lastIndexOf("/") + 1);
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

        <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
          <Button variant="contained" component="label">
            {defaultResume ? "Replace Resume" : "Upload Resume"}

            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </Button>

          {defaultResume && (
            <>
              <Button variant="outlined" onClick={handleViewResume}>
                View / Download
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
