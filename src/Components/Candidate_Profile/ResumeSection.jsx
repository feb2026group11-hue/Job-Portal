import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

const ResumeSection = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
        >
          Resume
        </Typography>

        <Typography>
          Resume_2026.pdf
        </Typography>

        <Typography color="text.secondary">
          Uploaded: 10 June 2026
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mt={2}
        >
          <Button variant="contained">
            Download
          </Button>

          <Button variant="outlined">
            Replace Resume
          </Button>
        </Stack>

      </CardContent>
    </Card>
  );
};

export default ResumeSection;