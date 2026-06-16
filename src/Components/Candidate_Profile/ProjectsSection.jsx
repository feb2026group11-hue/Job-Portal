import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

const projects = [
  {
    title: "Recruitment Job Portal",
    tech: [
      "React",
      "Spring Boot",
      "MySQL",
      "JWT",
    ],
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
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.io",
    ],
    description:
      "Social media platform supporting posts, stories and real-time messaging.",
  },
];

const ProjectsSection = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Projects
        </Typography>

        <Grid container spacing={2}>
          {projects.map((project, index) => (
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
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={1}
                  >
                    <FolderCopyOutlinedIcon color="primary" />

                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      {project.title}
                    </Typography>
                  </Stack>

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
                      {project.tech.map((tech) => (
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
  );
};

export default ProjectsSection;