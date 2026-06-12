import { Menu, MenuItem } from "@mui/material";
import { MuiTypography } from "../../../MUIComponents/Mui";

const QuickLinks = () => {
  return (
    <div>
      <Menu
        id="basic-menu1"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ width: 300 }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{ paddingLeft: 2, paddingRight: 2 }}
        >
          <MuiTypography>Account Settings</MuiTypography>
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{ paddingLeft: 2, paddingRight: 2 }}
        >
          <MuiTypography>Social Profile</MuiTypography>
        </MenuItem>
        <MenuItem onClick={logout} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <MuiTypography>Logout</MuiTypography>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default QuickLinks;
