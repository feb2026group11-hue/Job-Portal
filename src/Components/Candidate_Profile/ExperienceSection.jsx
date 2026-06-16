import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip,
  Box,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { profileData } from "../../Data/Data";
// const experiences = [
//   {
//     company: "S2TAB Software Pvt Ltd",
//     designation: "React.js Developer Intern",
//     duration: "Apr 2025 - Jul 2025",
//     skills: ["React.js", "Redux", "REST API", "JavaScript"],
//     description:
//       "Developed reusable React components, integrated REST APIs, implemented responsive UI and optimized application performance.",
//   },
//   {
//     company: "Freelance Projects",
//     designation: "Frontend Developer",
//     duration: "Aug 2025 - Present",
//     skills: ["React", "MUI", "Tailwind"],
//     description:
//       "Built modern web applications with reusable architecture and responsive design.",
//   },
// ];

const ExperienceSection = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Experience
        </Typography>

        {profileData.experience.map((exp, index) => (
          <Box key={index}>
            <Stack direction="row" spacing={2}>
              <WorkOutlineIcon color="primary" />

              <Box flex={1}>
                <Typography variant="h6" fontWeight={600}>
                  {exp.designation}
                </Typography>

                <Typography color="primary" fontWeight={500}>
                  {exp.company}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {exp.duration}
                </Typography>

                <Typography mt={1}>
                  {exp.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  mt={2}
                >
                  {exp.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>

            {index !== profileData.experience.length - 1 && (
              <Divider sx={{ my: 3 }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;