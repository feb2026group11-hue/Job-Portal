// import {
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   Stack,
//   Chip,
//   Box,
// } from "@mui/material";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import { profileData } from "../../Data/Data";
// // const experiences = [
// //   {
// //     company: "S2TAB Software Pvt Ltd",
// //     designation: "React.js Developer Intern",
// //     duration: "Apr 2025 - Jul 2025",
// //     skills: ["React.js", "Redux", "REST API", "JavaScript"],
// //     description:
// //       "Developed reusable React components, integrated REST APIs, implemented responsive UI and optimized application performance.",
// //   },
// //   {
// //     company: "Freelance Projects",
// //     designation: "Frontend Developer",
// //     duration: "Aug 2025 - Present",
// //     skills: ["React", "MUI", "Tailwind"],
// //     description:
// //       "Built modern web applications with reusable architecture and responsive design.",
// //   },
// // ];

// const ExperienceSection = () => {
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight={700} mb={3}>
//           Experience
//         </Typography>

//         {profileData.experience.map((exp, index) => (
//           <Box key={index}>
//             <Stack direction="row" spacing={2}>
//               <WorkOutlineIcon color="primary" />

//               <Box flex={1}>
//                 <Typography variant="h6" fontWeight={600}>
//                   {exp.designation}
//                 </Typography>

//                 <Typography color="primary" fontWeight={500}>
//                   {exp.company}
//                 </Typography>

//                 <Typography variant="body2" color="text.secondary">
//                   {exp.duration}
//                 </Typography>

//                 <Typography mt={1}>
//                   {exp.description}
//                 </Typography>

//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   flexWrap="wrap"
//                   mt={2}
//                 >
//                   {exp.skills.map((skill) => (
//                     <Chip
//                       key={skill}
//                       label={skill}
//                       size="small"
//                       variant="outlined"
//                     />
//                   ))}
//                 </Stack>
//               </Box>
//             </Stack>

//             {index !== profileData.experience.length - 1 && (
//               <Divider sx={{ my: 3 }} />
//             )}
//           </Box>
//         ))}
//       </CardContent>
//     </Card>
//   );
// };

// export default ExperienceSection;


import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip,
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
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { profileData } from "../../Data/Data";
import { useState } from "react";

import axios from "axios";
import { useEffect } from "react";

const ExperienceSection = ({ experiences = [], cid, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [experienceData, setExperienceData] = useState([]);
  const [currentExp, setCurrentExp] = useState({
    designation: "",
    company: "",
    duration: "",
    skills: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (experiences) {
      setExperienceData(experiences);
    }
  }, [experiences]);

  const parseDuration = (durationStr) => {
    let startDate = "2025-01-01";
    let endDate = null;
    let status = "Previous";

    if (!durationStr) return { startDate, endDate, status };

    const parts = durationStr.split("-").map(s => s.trim());
    if (parts.length > 0) {
      const startPart = parts[0];
      const parsedStart = Date.parse(startPart);
      if (!isNaN(parsedStart)) {
        startDate = new Date(parsedStart).toISOString().split('T')[0];
      } else {
        const date = new Date(startPart + " 1");
        if (!isNaN(date.getTime())) {
          startDate = date.toISOString().split('T')[0];
        }
      }
    }

    if (parts.length > 1) {
      const endPart = parts[1];
      if (endPart.toLowerCase() === "present" || endPart.toLowerCase() === "current") {
        status = "Current";
        endDate = null;
      } else {
        const parsedEnd = Date.parse(endPart);
        if (!isNaN(parsedEnd)) {
          endDate = new Date(parsedEnd).toISOString().split('T')[0];
        } else {
          const date = new Date(endPart + " 1");
          if (!isNaN(date.getTime())) {
            endDate = date.toISOString().split('T')[0];
          }
        }
      }
    }
    return { startDate, endDate, status };
  };

  const formatDuration = (startDate, endDate, status) => {
    const options = { year: 'numeric', month: 'short' };
    const start = startDate ? new Date(startDate).toLocaleDateString('en-US', options) : "";
    let end = "Present";
    if (status !== "Current" && endDate) {
      end = new Date(endDate).toLocaleDateString('en-US', options);
    }
    return start && end ? `${start} - ${end}` : (start || end);
  };

  const handleOpenEdit = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setCurrentExp({
        designation: experienceData[index].designation || "",
        company: experienceData[index].companyName || "",
        duration: formatDuration(experienceData[index].startDate, experienceData[index].endDate, experienceData[index].status),
        skills: "",
        description: experienceData[index].description || "",
      });
    } else {
      setEditingIndex(null);
      setCurrentExp({
        designation: "",
        company: "",
        duration: "",
        skills: "",
        description: "",
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    const { startDate, endDate, status } = parseDuration(currentExp.duration);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const payload = {
      cid,
      companyName: currentExp.company,
      designation: currentExp.designation,
      description: currentExp.description,
      startDate,
      endDate,
      status,
      salary: 0.0,
    };

    try {
      if (editingIndex !== null) {
        const expId = experienceData[editingIndex].expId;
        await axios.put(
          `http://localhost:8082/api/experiences/${expId}`,
          { ...payload, expId },
          { headers }
        );
      } else {
        await axios.post(
          `http://localhost:8082/api/experiences`,
          payload,
          { headers }
        );
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch (err) {
      console.error("Failed to save experience:", err);
    }
  };

  const handleDelete = async (index) => {
    const expId = experienceData[index].expId;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8082/api/experiences/${expId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Failed to delete experience:", err);
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
              Experience
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

          {experienceData.map((exp, index) => (
            <Box key={index}>
              <Stack direction="row" spacing={2}>
                <WorkOutlineIcon color="primary" />

                <Box flex={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="start">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {exp.designation}
                      </Typography>

                      <Typography color="primary" fontWeight={500}>
                        {exp.companyName || exp.company}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {exp.startDate ? formatDuration(exp.startDate, exp.endDate, exp.status) : exp.duration}
                      </Typography>

                      <Typography mt={1}>{exp.description}</Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        mt={2}
                      >
                        {exp.skills && exp.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
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

              {index !== experienceData.length - 1 && (
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
          {editingIndex !== null ? "Edit Experience" : "Add Experience"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Designation"
            value={currentExp.designation}
            onChange={(e) =>
              setCurrentExp({ ...currentExp, designation: e.target.value })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Company"
            value={currentExp.company}
            onChange={(e) =>
              setCurrentExp({ ...currentExp, company: e.target.value })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Duration"
            value={currentExp.duration}
            onChange={(e) =>
              setCurrentExp({ ...currentExp, duration: e.target.value })
            }
            helperText="e.g., Apr 2025 - Jul 2025"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Skills"
            value={currentExp.skills}
            onChange={(e) =>
              setCurrentExp({ ...currentExp, skills: e.target.value })
            }
            helperText="Separate skills with commas (e.g., React.js, Redux, JavaScript)"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={currentExp.description}
            onChange={(e) =>
              setCurrentExp({ ...currentExp, description: e.target.value })
            }
            multiline
            rows={3}
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

export default ExperienceSection;