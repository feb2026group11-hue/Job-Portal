import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Edit } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ skills }) => {
  const [open, setOpen] = useState(false);
  const [skillText, setSkillText] = useState(
    skills.join(", ")
  );

  const handleSave = () => {
    console.log(
      skillText
        .split(",")
        .map((skill) => skill.trim())
    );

    setOpen(false);
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Skills
            </Typography>

            <Edit
              size={18}
              className="edit-icon-btn"
              onClick={() => setOpen(true)}
              style={{
                cursor: "pointer",
              }}
            />
          </Box>

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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Edit Skills
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Skills"
            value={skillText}
            onChange={(e) =>
              setSkillText(e.target.value)
            }
            helperText="Separate skills with commas"
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SkillsSection;