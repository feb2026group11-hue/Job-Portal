import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { Edit } from "lucide-react";

// const skills = [
//   "Java",
//   "Spring Boot",
//   "React.js",
//   "MySQL",
//   "Redux",
//   "JWT",
//   "REST API",
//   "Git",
// ];

const SkillsSection = ({skills,onEdit}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
    <Typography className="d-flex justify-content-between">
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Skills
        </Typography>
        
        <Edit onClick={onEdit} className="edit-icon-btn"/>
</Typography>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
        >
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>

      </CardContent>
    </Card>
  );
};

export default SkillsSection;