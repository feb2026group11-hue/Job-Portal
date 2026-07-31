// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Chip,
//   Stack,
//   Box,
// } from "@mui/material";
// import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

// const projects = [
//   {
//     title: "Recruitment Job Portal",
//     tech: [
//       "React",
//       "Spring Boot",
//       "MySQL",
//       "JWT",
//     ],
//     description:
//       "Naukri-like recruitment platform for candidates, employers and administrators with job applications and resume management.",
//   },
//   {
//     title: "Criminal Face Detection",
//     tech: ["Java", "MySQL"],
//     description:
//       "System for storing criminal records and identifying suspects through image recognition.",
//   },
//   {
//     title: "Aahar Food Donation App",
//     tech: ["Android", "Java", "Firebase"],
//     description:
//       "Food donation platform connecting donors and recipients to reduce food wastage.",
//   },
//   {
//     title: "Meme Verse",
//     tech: [
//       "React",
//       "Node.js",
//       "MongoDB",
//       "Socket.io",
//     ],
//     description:
//       "Social media platform supporting posts, stories and real-time messaging.",
//   },
// ];

// const ProjectsSection = () => {
//   return (
//     <Card sx={{ mb: 3 }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight={700} mb={3}>
//           Projects
//         </Typography>

//         <Grid container spacing={2}>
//           {projects.map((project, index) => (
//             <Grid item xs={12} md={6} key={index}>
//               <Card
//                 variant="outlined"
//                 sx={{
//                   height: "100%",
//                   transition: "0.3s",
//                   "&:hover": {
//                     boxShadow: 3,
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Stack
//                     direction="row"
//                     spacing={1}
//                     alignItems="center"
//                     mb={1}
//                   >
//                     <FolderCopyOutlinedIcon color="primary" />

//                     <Typography
//                       variant="h6"
//                       fontWeight={600}
//                     >
//                       {project.title}
//                     </Typography>
//                   </Stack>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     mb={2}
//                   >
//                     {project.description}
//                   </Typography>

//                   <Box>
//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       useFlexGap
//                       flexWrap="wrap"
//                     >
//                       {project.tech.map((tech) => (
//                         <Chip
//                           key={tech}
//                           label={tech}
//                           size="small"
//                           color="primary"
//                           variant="outlined"
//                         />
//                       ))}
//                     </Stack>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProjectsSection;


import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
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
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { useState } from "react";

const projects = [
  {
    title: "Recruitment Job Portal",
    tech: ["React", "Spring Boot", "MySQL", "JWT"],
    description:
      "Naukri-like recruitment platform for candidates, employers and administrators with job applications and resume management.",
  },
  {
    title: "Criminal Face Detection",
    tech: ["Java", "MySQL"],
    description:
      "System for storing criminal records and identifying suspects through image recognition.",
  },
  {
    title: "Aahar Food Donation App",
    tech: ["Android", "Java", "Firebase"],
    description:
      "Food donation platform connecting donors and recipients to reduce food wastage.",
  },
  {
    title: "Meme Verse",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    description:
      "Social media platform supporting posts, stories and real-time messaging.",
  },
];

import axios from "axios";
import { useEffect } from "react";

const ProjectsSection = ({ projects = [], cid, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    tech: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (projects) {
      setProjectsData(projects);
    }
  }, [projects]);

  const handleOpenEdit = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setCurrentProject({
        title: projectsData[index].projectTitle || "",
        tech: projectsData[index].tech ? projectsData[index].tech.join(", ") : "",
        description: projectsData[index].description || "",
      });
    } else {
      setEditingIndex(null);
      setCurrentProject({
        title: "",
        tech: "",
        description: "",
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

    const payload = {
      cid,
      projectTitle: currentProject.title,
      description: currentProject.description,
      projectUrl: "",
      startDate: "2025-01-01",
      endDate: "2025-06-01",
    };

    try {
      if (editingIndex !== null) {
        const cpid = projectsData[editingIndex].cpid;
        await axios.put(
          `http://localhost:8082/api/projects/${cpid}`,
          { ...payload, cpid },
          { headers }
        );
      } else {
        await axios.post(
          `http://localhost:8082/api/projects`,
          payload,
          { headers }
        );
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const handleDelete = async (index) => {
    const cpid = projectsData[index].cpid;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8082/api/projects/${cpid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Failed to delete project:", err);
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
              Projects
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

          <Grid container spacing={2}>
            {projectsData.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="start">
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={1}
                      >
                        <FolderCopyOutlinedIcon color="primary" />

                        <Typography variant="h6" fontWeight={600}>
                          {project.projectTitle || project.title}
                        </Typography>
                      </Stack>

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

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={2}
                    >
                      {project.description}
                    </Typography>

                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                      >
                        {project.tech && project.tech.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingIndex !== null ? "Edit Project" : "Add Project"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Project Title"
            value={currentProject.title}
            onChange={(e) =>
              setCurrentProject({ ...currentProject, title: e.target.value })
            }
            helperText="e.g., Recruitment Job Portal"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Technologies"
            value={currentProject.tech}
            onChange={(e) =>
              setCurrentProject({ ...currentProject, tech: e.target.value })
            }
            helperText="Separate technologies with commas (e.g., React, Node.js, MongoDB)"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={currentProject.description}
            onChange={(e) =>
              setCurrentProject({ ...currentProject, description: e.target.value })
            }
            multiline
            rows={4}
            helperText="Describe your project briefly"
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

export default ProjectsSection;