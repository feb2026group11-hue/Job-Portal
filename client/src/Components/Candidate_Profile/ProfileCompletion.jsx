import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  List,
  ListItem,
} from "@mui/material";

const ProfileCompletion = ( {progress }) => {
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
          <ListItem>✔ Resume Added</ListItem>
          <ListItem>✔ Skills Added</ListItem>
          <ListItem>✔ Experience Added</ListItem>
          <ListItem>❌ Certifications</ListItem>
          <ListItem>❌ Projects</ListItem>
        </List>

      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;