// import {
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   Stack,
//   Box,
// } from "@mui/material";
// import SchoolIcon from "@mui/icons-material/School";

// const educationData = [
//   {
//     degree: "PG-DAC",
//     institute: "CDAC",
//     duration: "2025 - 2026",
//     score: "A Grade",
//   },
//   {
//     degree: "Bachelor of Engineering",
//     institute: "Computer Engineering",
//     duration: "2021 - 2025",
//     score: "CGPA: 8.2",
//   },
//   {
//     degree: "HSC",
//     institute: "Maharashtra State Board",
//     duration: "2020 - 2021",
//     score: "78%",
//   },
// ];

// const EducationSection = () => {
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight={700} mb={3}>
//           Education
//         </Typography>

//         {educationData.map((edu, index) => (
//           <Box key={index}>
//             <Stack direction="row" spacing={2}>
//               <SchoolIcon color="primary" />

//               <Box>
//                 <Typography variant="h6" fontWeight={600}>
//                   {edu.degree}
//                 </Typography>

//                 <Typography color="primary">
//                   {edu.institute}
//                 </Typography>

//                 <Typography color="text.secondary">
//                   {edu.duration}
//                 </Typography>

//                 <Typography mt={1}>
//                   {edu.score}
//                 </Typography>
//               </Box>
//             </Stack>

//             {index !== educationData.length - 1 && (
//               <Divider sx={{ my: 3 }} />
//             )}
//           </Box>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default EducationSection;

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Plus, Delete } from "lucide-react";
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";


import axios from "axios";
import { useEffect } from "react";

const EducationSection = ({ education = [], cid, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [currentEdu, setCurrentEdu] = useState({
    degree: "",
    institute: "",
    duration: "",
    score: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (education) {
      setEducationData(education);
    }
  }, [education]);

  const handleOpenEdit = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setCurrentEdu({
        degree: educationData[index].educationType || "",
        institute: educationData[index].universityName || "",
        duration: educationData[index].duration || "",
        score: educationData[index].grade ? String(educationData[index].grade) : "",
      });
    } else {
      setEditingIndex(null);
      setCurrentEdu({
        degree: "",
        institute: "",
        duration: "",
        score: "",
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Extract passing year from duration string (default to 2024 if parsing fails)
    let passingYear = 2024;
    const match = currentEdu.duration.match(/\b(19|20)\d{2}\b/g);
    if (match && match.length > 0) {
      passingYear = parseInt(match[match.length - 1]);
    }

    const payload = {
      cid,
      educationType: currentEdu.degree,
      universityName: currentEdu.institute,
      specialization: currentEdu.degree, // Default specialization to degree
      passingYear: String(passingYear), // DTO mapping expects String or integer
      courseType: "Full", // Default courseType to Full
      grade: currentEdu.score ? Number(currentEdu.score) : 0.0,
      duration: currentEdu.duration,
    };

    try {
      if (editingIndex !== null) {
        const ceid = educationData[editingIndex].ceid;
        await axios.put(
          `http://localhost:8082/education/update/${ceid}`,
          { ...payload, ceid },
          { headers }
        );
      } else {
        await axios.post(
          `http://localhost:8082/education/add`,
          payload,
          { headers }
        );
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch (err) {
      console.error("Failed to save education:", err);
    }
  };

  const handleDelete = async (index) => {
    const ceid = educationData[index].ceid;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8082/education/delete/${ceid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Failed to delete education:", err);
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight={700}>
              Education
            </Typography>

            <Box display="flex" gap={1}>
              <IconButton
                size="small"
                onClick={() => handleOpenEdit()}
                sx={{ color: "primary.main" }}
              >
                <Plus size={18} />
              </IconButton>

              <IconButton
                size="small"
                onClick={() => handleOpenEdit(0)}
                sx={{ color: "primary.main" }}
              >
                <Edit size={18} />
              </IconButton>
            </Box>
          </Box>

          {educationData.map((edu, index) => (
            <Box key={index}>
              <Stack direction="row" spacing={2}>
                <SchoolIcon color="primary" />

                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="start">
                    <Box>
                       <Typography variant="h6" fontWeight={600}>
                        {edu.educationType || edu.degree}
                      </Typography>

                      <Typography color="primary">
                        {edu.universityName || edu.institute}
                      </Typography>

                      <Typography color="text.secondary">
                        {edu.duration}
                      </Typography>

                      <Typography mt={1}>
                        Score: {edu.grade || edu.score}
                      </Typography>
                    </Box>

                    <Box display="flex" gap={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEdit(index)}
                        sx={{ color: "primary.main" }}
                      >
                        <Edit size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(index)}
                        sx={{ color: "error.main" }}
                      >
                        <Delete size={16} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Stack>

              {index !== educationData.length - 1 && (
                <Divider sx={{ my: 3 }} />
              )}
            </Box>
          ))}
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingIndex !== null ? "Edit Education" : "Add Education"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Degree"
            value={currentEdu.degree}
            onChange={(e) =>
              setCurrentEdu({ ...currentEdu, degree: e.target.value })
            }
            helperText="e.g., PG-DAC, Bachelor of Engineering"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Institute"
            value={currentEdu.institute}
            onChange={(e) =>
              setCurrentEdu({ ...currentEdu, institute: e.target.value })
            }
            helperText="e.g., CDAC, University Name"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Duration"
            value={currentEdu.duration}
            onChange={(e) =>
              setCurrentEdu({ ...currentEdu, duration: e.target.value })
            }
            helperText="e.g., 2025 - 2026"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Score"
            value={currentEdu.score}
            onChange={(e) =>
              setCurrentEdu({ ...currentEdu, score: e.target.value })
            }
            helperText="e.g., CGPA: 8.2, A Grade, 78%"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSave}>
            {editingIndex !== null ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EducationSection;