import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import { MuiBox } from "../../../MUIComponents/Mui";
import { useTheme } from "@emotion/react";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 55,
  height: 55,
  m: 0,
  backgroundColor: "transparent",
  borderRadius: "20%",
  "&:hover": {
    // backgroundColor: "transparent",
  },
  "& .icon": {
    width: "100%",
    height: "100%",
    color: "rgb(30, 136, 229)",
  },
}));

const DarkMode = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  return (
    <StyledIconButton sx={{}} onClick={toggleDarkMode}>
      <MuiBox
        className="AppBarIconBtn2"
        sx={{
          borderRadius: "20%",
          // border: "1px solid #cccccc",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1.4,
          [theme.breakpoints.down("sm")]: {
            borderRadius: "50%",
          },
        }}
      >
        {darkMode === "dark" ? (
          <img src="/sun.svg" alt="Light Mode" className="icon" />
        ) : (
          <img src="/moon.svg" alt="Dark Mode" className="icon" />
        )}
      </MuiBox>
    </StyledIconButton>
  );
};
export default DarkMode;

DarkMode.propTypes = {
  darkMode: PropTypes.string.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};
