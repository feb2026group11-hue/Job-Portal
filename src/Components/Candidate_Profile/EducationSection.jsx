import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Box,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const educationData = [
  {
    degree: "PG-DAC",
    institute: "CDAC",
    duration: "2025 - 2026",
    score: "A Grade",
  },
  {
    degree: "Bachelor of Engineering",
    institute: "Computer Engineering",
    duration: "2021 - 2025",
    score: "CGPA: 8.2",
  },
  {
    degree: "HSC",
    institute: "Maharashtra State Board",
    duration: "2020 - 2021",
    score: "78%",
  },
];

const EducationSection = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Education
        </Typography>

        {educationData.map((edu, index) => (
          <Box key={index}>
            <Stack direction="row" spacing={2}>
              <SchoolIcon color="primary" />

              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {edu.degree}
                </Typography>

                <Typography color="primary">
                  {edu.institute}
                </Typography>

                <Typography color="text.secondary">
                  {edu.duration}
                </Typography>

                <Typography mt={1}>
                  {edu.score}
                </Typography>
              </Box>
            </Stack>

            {index !== educationData.length - 1 && (
              <Divider sx={{ my: 3 }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationSection;