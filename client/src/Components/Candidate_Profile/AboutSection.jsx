import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AboutSection = ({aboutDes}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          About Me
        </Typography>

        <Typography color="text.secondary">
         {aboutDes}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default AboutSection;