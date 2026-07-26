import { useNavigate } from "react-router-dom";
import {
  MuiBox,
  MuiButton,
  MuiCard,
  MuiTypography,
} from "../../MUIComponents/Mui";

const CommingSoon = () => {
  const navigate = useNavigate();
  return (
    <MuiBox className="d-flex justify-content-center">
      <MuiCard sx={{ p: 2 }}>
        <MuiTypography
          variant="h4"
          className="d-flex"
          sx={{
            fontWeight: "bold",
            color: "rgb(16, 34, 175)",
            backgroundColor: "rgb(184, 218, 247)",
            borderRadius: "20px",
            p: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Comming Soon
        </MuiTypography>
        <MuiTypography
          className="d-flex mt-1"
          sx={{ color: "gray", alignItems: "center", justifyContent: "center" }}
          variant="subtitle1"
        >
          This section is under construction
        </MuiTypography>
        <MuiButton
          className="d-flex mx-auto fw-bold border-2"
          color="secondary"
          variant="outlined"
          onClick={() => navigate("/dashboard/home")}
        >
          Home
        </MuiButton>
      </MuiCard>
    </MuiBox>
  );
};
export default CommingSoon;