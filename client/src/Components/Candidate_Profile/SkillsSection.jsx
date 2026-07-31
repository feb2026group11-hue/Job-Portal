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

import axios from "axios";
import { useEffect } from "react";

const SkillsSection = ({ skills, cid, onRefresh }) => {
  const [open, setOpen] = useState(false);
  const [skillText, setSkillText] = useState("");

  useEffect(() => {
    if (skills) {
      setSkillText(skills.map((s) => s.skillName).filter(Boolean).join(", "));
    }
  }, [skills]);

  const handleSave = async () => {
    const skillList = skillText
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8082/api/candidate-skills/candidate/${cid}`,
        skillList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch (err) {
      console.error("Failed to save skills:", err);
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
            {skills && skills.map((skill) => (
              <Chip
                key={skill.csId || skill.skillId || skill.skillName}
                label={skill.skillName}
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