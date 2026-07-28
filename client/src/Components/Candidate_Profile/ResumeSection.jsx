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

const ResumeSection = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.candidateProfile.profile);


const fetchResume = useCallback(async () => {
  const res = await dispatch(getResume(profile.cid));
  console.log(res.payload);
  // setResumeFile(res.payload.file);
}, [dispatch, profile?.cid]);

useEffect(() => {
  if (profile?.cid) {
    fetchResume();
  }
}, [fetchResume]);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setResumeFile(file);

    try {
      const res = await dispatch(
        uploadResume({
          cid: profile.cid,
          summary: "Java Full Stack Developer",
          isDefault: true,
          file,
        }),
      );

      // console.log(res);

      toast.success("Resume Updated succesfully");
    } catch (err) {
      toast.error("Resume upload failed");
    }
  };

  const handleViewResume = () => {
    if (!resumeFile) return;

    const fileURL = URL.createObjectURL(resumeFile);
    window.open(fileURL, "_blank");
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Resume
        </Typography>

        {resumeFile ? (
          <>
            <Typography>{resumeFile.name}</Typography>

            <Typography color="text.secondary">
              {(resumeFile.size / 1024).toFixed(2)} KB
            </Typography>
          </>
        ) : (
          <Typography color="text.secondary">No resume uploaded</Typography>
        )}

        <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
          <Button variant="contained" component="label">
            {resumeFile ? "Replace Resume" : "Upload Resume"}

            <input
              hidden
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </Button>

          {resumeFile && (
            <>
              <Button variant="outlined" onClick={handleViewResume}>
                View Resume
              </Button>

              <Button
                variant="outlined"
                component="a"
                href={URL.createObjectURL(resumeFile)}
                download={resumeFile.name}
              >
                Download
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
