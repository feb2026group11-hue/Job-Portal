import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  List,
  ListItem,
} from "@mui/material";

const ProfileCompletion = ({ progress, checklist = {} }) => {
  const {
    hasResume = false,
    hasSkills = false,
    hasExperience = false,
    hasEducation = false,
    hasProjects = false,
  } = checklist;

  return (
    <Card>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Profile Score
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
          }}
        />

        <Typography mt={1}>
          {progress}%
        </Typography>

        <List>
          <ListItem>{hasResume ? "✔ Resume Added" : "❌ Resume Added"}</ListItem>
          <ListItem>{hasSkills ? "✔ Skills Added" : "❌ Skills Added"}</ListItem>
          <ListItem>{hasExperience ? "✔ Experience Added" : "❌ Experience Added"}</ListItem>
          <ListItem>{hasEducation ? "✔ Education Added" : "❌ Education Added"}</ListItem>
          <ListItem>{hasProjects ? "✔ Projects Added" : "❌ Projects Added"}</ListItem>
        </List>

      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;