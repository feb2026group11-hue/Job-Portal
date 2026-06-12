import {
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Typography,
  Drawer,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Paper,
  TextField,
  Card,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import propTypes from "prop-types";
export const MuiBox = (props) => {
  return <Box {...props}>{props.children}</Box>;
};

export const MuiTypography = (props) => {
  return <Typography {...props}>{props.children}</Typography>;
};
export const MuiAvatar = (props) => {
  return <Avatar {...props}>{props.children}</Avatar>;
};
export const MuiBadge = (props) => {
  return <Badge {...props}>{props.children}</Badge>;
};
export const MuiMenu = (props) => {
  return <Menu {...props}>{props.children}</Menu>;
};
export const MuiInputBase = (props) => {
  return <InputBase {...props}>{props.children}</InputBase>;
};
export const MuiMenuItem = (props) => {
  return <MenuItem {...props}>{props.children}</MenuItem>;
};
export const MuiSwitch = (props) => {
  return <Switch {...props}>{props.children}</Switch>;
};
export const MuiThemeProvider = (props) => {
  return <ThemeProvider {...props}>{props.children}</ThemeProvider>;
};
export const MuiDrawer = (props) => {
  return <Drawer {...props}>{props.children}</Drawer>;
};
export const MuiToolbar = (props) => {
  return <Toolbar {...props}>{props.children}</Toolbar>;
};
export const MuiList = (props) => {
  return <List {...props}>{props.children}</List>;
};
export const MuiDivider = (props) => {
  return <Divider {...props}>{props.children}</Divider>;
};
export const MuiButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};
export const MuiIconButton = (props) => {
  return <IconButton {...props}>{props.children}</IconButton>;
};
export const MuiListItem = (props) => {
  return <ListItem {...props}>{props.children}</ListItem>;
};
export const MuiListItemButton = (props) => {
  return <ListItemButton {...props}>{props.children}</ListItemButton>;
};
export const MuiListItemIcon = (props) => {
  return <ListItemIcon {...props}>{props.children}</ListItemIcon>;
};
export const MuiListItemText = (props) => {
  return <ListItemText {...props}>{props.children}</ListItemText>;
};
export const MuiPaper = (props) => {
  return <Paper {...props}>{props.children}</Paper>;
};
export const MuiTextField = (props) => {
  return <TextField {...props}>{props.children}</TextField>;
};
export const MuiCard = (props) => {
  return <Card {...props}>{props.children}</Card>;
};
export const MuiCheckBox = (props) => {
  return <Checkbox {...props}>{props.children}</Checkbox>;
};
export const MuiFormControlLabel = (props) => {
  return <FormControlLabel {...props}>{props.children}</FormControlLabel>;
};
export const MuiFilledOutlinedTextFiled = (props) => {
  return (
    <MuiTextField
      InputLabelProps={{
        sx: {
          fontSize: "0.75rem",
          "&.MuiInputLabel-shrink": {
            marginTop: "1rem", // Adjust margin when label is shrunk (focused or filled)
            paddingLeft: "0.25rem", // Adjust padding when label is shrunk
            fontSize: "0.95rem", // Ensure the font size remains small when shrunk
            transform: "translate(14px, -6px) scale(0.75)", // Adjust the transform to move the label correctly
          },
        },
      }}
      InputProps={{
        disableUnderline: true, // Disable underline to make it look like outlined variant
        sx: {
          fontWeight: "550",
          fontFamily: "inherit",
          backgroundColor: "white", // Input background color
          borderRadius: "10px", // Border radius
          border: "1px solid rgba(0, 0, 0, 0.23)", // Default border color
          paddingLeft: "0.3rem", // Padding inside the input
          "&:hover": {
            border: "1px solid rgba(0, 0, 0, 0.87)", // Border color on hover
          },
          "&.Mui-focused": {
            border: "2px solid rgb(33, 150, 243)", // Border color on focus
          },
        },
      }}
      sx={{
        mb: 2,
        width: "100%", // Make the text field take the full width of the container
        maxWidth: "400px", // Limit the maximum width
        "& .MuiFilledInput-root": {
          backgroundColor: "rgb(244 245 247)", // Set background color for the filled input
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "rgb(244 245 247)",
          },
        },
        "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after":
          {
            display: "none", // Hide the underline for both before and after states
          },
      }}
      {...props}
    />
  );
};

MuiTypography.propTypes = {
  children: propTypes.any,
};
MuiBox.propTypes = {
  children: propTypes.any,
};
MuiAvatar.propTypes = {
  children: propTypes.any,
};
MuiBadge.propTypes = {
  children: propTypes.any,
};
MuiMenu.propTypes = {
  children: propTypes.any,
};
MuiInputBase.propTypes = {
  children: propTypes.any,
};
MuiAvatar.propTypes = {
  children: propTypes.any,
};
MuiBadge.propTypes = {
  children: propTypes.any,
};
MuiButton.propTypes = {
  children: propTypes.any,
};
MuiDivider.propTypes = {
  children: propTypes.any,
};
MuiDrawer.propTypes = {
  children: propTypes.any,
};
MuiIconButton.propTypes = {
  children: propTypes.any,
};
MuiList.propTypes = {
  children: propTypes.any,
};
MuiListItem.propTypes = {
  children: propTypes.any,
};
MuiListItemButton.propTypes = {
  children: propTypes.any,
};
MuiListItemIcon.propTypes = {
  children: propTypes.any,
};
MuiListItemText.propTypes = {
  children: propTypes.any,
};
MuiMenuItem.propTypes = {
  children: propTypes.any,
};
MuiSwitch.propTypes = {
  children: propTypes.any,
};
MuiThemeProvider.propTypes = {
  children: propTypes.any,
};
MuiToolbar.propTypes = {
  children: propTypes.any,
};
MuiPaper.propTypes = {
  children: propTypes.any,
};
MuiTextField.propTypes = {
  children: propTypes.any,
};
MuiFormControlLabel.propTypes = {
  children: propTypes.any,
};
MuiCard.propTypes = {
  children: propTypes.any,
};
MuiCheckBox.propTypes = {
  children: propTypes.any,
};
