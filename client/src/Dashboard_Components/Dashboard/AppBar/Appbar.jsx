import "../../Css/DashboardAll.css";
import "../../../App.css";
import {
  AppBar,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MuiAvatar,
  MuiBadge,
  MuiBox,
  MuiIconButton,
  MuiToolbar,
  MuiDrawer,
  MuiTypography,
  MuiDivider,
} from "../../../MUIComponents/Mui";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import TranslateIcon from "@mui/icons-material/Translate";
import SearchComponent from "./SearchComponent";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu"; 
import {
  ExitToApp,
  AccountCircleRounded,
  SocialDistance,
  TurnLeft,
  BorderColor,
} from "@mui/icons-material";
import DrawerList from "../Drawer/DrawerList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import toast from "react-hot-toast";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../app/Authslice";
// import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;
const drawerWidthMobile = 200;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  [theme.breakpoints.down("md")]: {
    paddingTop: 9,
    marginBottom: 7,
  },
}));
const MuiAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        // width: "100%",
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        [theme.breakpoints.down("md")]: {
          marginLeft: "0px",
          width: "100%",
        },
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export const Appbar = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(null);
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const username = localStorage.getItem("username");
  const loguser = useSelector((state)=>state.auth.user);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setOpen(true);
  }, [isMd]);

  const [anchorEl, setAnchorEl] = useState(false);
  const open1 = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const hanldeLogout = () => {
    dispatch(logout());
    navigate("/");
    handleClose();
    toast.success("Logout Successfully");
  };
  // useEffect(() => {
  //   const getLoggedUser = async () => {
      
  //   };
  //   getLoggedUser();
  // }, []);

  return (
    <>
      <MuiAppBar
        className="appbar"
        sx={{
          alignItems: "center",
          [theme.breakpoints.down("md")]: { open: { close } },
        }}
        position="fixed"
        open={open}
      >
        <MuiToolbar
          className="p-0"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MuiIconButton
            onClick={handleDrawerToggle}
            className="AppBarMenuBtn"
            sx={{
              // backgroundColor: "#ede7f6",
              borderRadius: "25%",
              // width: "5%",
              p: 1,
              mx: 1,
              display: "none",
              "&:hover": {
                backgroundColor: "#5e35b1",
              },
              [theme.breakpoints.down("md")]: {
                display: "flex",
                float: "left",
                // width: "7%",
              },
              [theme.breakpoints.down("sm")]: {
                // width: "7%",
                me: 1,
              },
            }}
          >
            <MenuIcon
              sx={{
                color: "rgb(94, 53, 177)",
                fontSize: "smaller",
                "&:hover": {
                  color: "whitesmoke",
                },
              }}
            />
          </MuiIconButton>
          <MuiBox sx={{ flex: 1 }}>
            <SearchComponent
              sx={{
                [theme.breakpoints.down("sm")]: {
                  display: "none",
                },
              }}
            />
          </MuiBox>
          <MuiBox className="" sx={{ display: "flex", alignItems: "center" }}>
            <DarkMode
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              className="my-0 mx-0"
            />
            <MuiIconButton
              className="AppBarIconBtn1"
              size="medium"
              sx={{
                // backgroundColor: "#ede7f6",
                borderRadius: "25%",
                mx: 1,
                "&:hover": {
                  // backgroundColor: "#5e35b1",
                },
                [theme.breakpoints.down("sm")]: {
                  borderRadius: "25px",
                },
              }}
            >
              <MuiBadge>
                <NotificationsNoneIcon
                  className="AppBarIcon1"
                  sx={{
                    color: "rgb(94, 53, 177)",
                    fontSize: "smaller",
                    "&:hover": {
                      // color: "whitesmoke",
                    },
                  }}
                />
              </MuiBadge>
            </MuiIconButton>
            <MuiIconButton
              className="AppBarIconBtn2"
              size="medium"
              sx={{
                // backgroundColor: "#e3f2fd",
                borderRadius: "25%",
                mx: 1,
                "&:hover": {
                  // backgroundColor: "#2196f3",
                },
                [theme.breakpoints.down("sm")]: {
                  borderRadius: "25px",
                },
              }}
            >
              <MuiBadge>
                <TranslateIcon
                  className="AppBarIcon2"
                  sx={{
                    fontSize: "smaller",
                    color: "rgb(30, 136, 229)",
                    "&:hover": {
                      // color: "whitesmoke",
                    },
                  }}
                />
              </MuiBadge>
            </MuiIconButton>
            <MuiIconButton
              size="medium"
              className="AppBarIconBtn1"
              sx={{
                // backgroundColor: "#ede7f6",
                borderRadius: "25%",
                mx: 1,
                "&:hover": {
                  // backgroundColor: "#5e35b1",
                },
                [theme.breakpoints.down("sm")]: {
                  borderRadius: "25px",
                },
              }}
            >
              <WifiTetheringIcon
                className="AppBarIcon1"
                sx={{
                  color: "rgb(94, 53, 177)",
                  fontSize: "smaller",
                  "&:hover": {
                    // color: "whitesmoke",
                  },
                }}
              />
            </MuiIconButton>
            <MuiIconButton
              className="AppBarIconBtn2"
              size="small"
              color="inherit"
              id="basic-button"
              aria-controls={open1 ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? "true" : undefined}
              onClick={handleClick}
              sx={{
                borderRadius: "25px",
                // backgroundColor: "#e3f2fd",
                mx: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MuiAvatar
                className="avatar"
                sx={{
                  float: "left",
                  border: "2px solid white",
                  // p: "5px",
                  [theme.breakpoints.down("sm")]: {
                    p: "0px",
                    float: "right",
                    width: 35,
                    height: 35,
                  },
                }}
                src={user?.[0]?.profile}
              />
              <SettingsOutlinedIcon
                className="AppBarIcon2"
                sx={{
                  mx: 1,
                  my: 0,
                  color: "rgb(100, 136, 229)",
                  // fontSize: "smaller",
                  "&:hover": {
                    // color: "whitesmoke",
                  },
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                }}
              />
            </MuiIconButton>
            <Menu
              id="basic-menu"
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
                sx={{
                  backgroundColor: "#e3f2fd",
                  marginTop: "-8px",
                  py: 1,
                  borderBottom: "1px solid rgb(185, 185, 187)",
                }}
              >
                <MuiTypography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mx: "auto",
                    fontWeight: "bold",
                    color: "rgb(30, 136, 229)",
                  }}
                >
                  {user?.[0]?.fullname}
                </MuiTypography>
              </MenuItem>
              {/* <MuiDivider sx={{ border: "1px solid gray" }} /> */}
              <MenuItem>
                <AccountCircleRounded sx={{ mr: 2 }} />
                My Profile
              </MenuItem>

              <MenuItem>
                <DescriptionOutlinedIcon sx={{ mr: 2 }} />
                Resume
              </MenuItem>

              <MenuItem>
                <AssignmentTurnedInOutlinedIcon sx={{ mr: 2 }} />
                Applied Jobs
              </MenuItem>

              <MenuItem>
                <BookmarkBorderIcon sx={{ mr: 2 }} />
                Saved Jobs
              </MenuItem>

              <MenuItem onClick={hanldeLogout}>
                <ExitToApp sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </MuiBox>
        </MuiToolbar>
      </MuiAppBar>
      <MuiDrawer
        className="sidebar"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: "100%",
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            [theme.breakpoints.down("sm")]: {
              width: drawerWidthMobile,
            },
          },
          [theme.breakpoints.down("sm")]: {
            width: drawerWidthMobile,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ py: 1, height: "auto" }}>
          <MuiTypography
            className="header-title"
            sx={{
              display: "flex",
              alignItems: "center",
              mx: 2,
              fontWeight: "bolder",
              letterSpacing: 2,
              "&:active": { color: "black" },
              [theme.breakpoints.down("md")]: {
                // display: "none",
              },
            }}
          >
            <img
              style={{
                borderRadius: "50%",
              }}
              className="berryimg"
              src="/assets/Logo/logo-job-portal.webp"
            />
            <span className="mx-1" />
            <div>
            Job Portal <br/>
            <span style={{fontSize:'12px',color:'gray'}}>{loguser?.role}</span>
            </div>
          </MuiTypography>
          <MuiIconButton
            className="MenuCloseSection AppBarIconBtn1"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: "5px",
              width: "auto",
              height: "auto",
              color: "#5e35b1",
              m: 0.7,
              p: 0.7,
              display: "none",
              "&:hover": {
                backgroundColor: "#5e35b1",
              },
              [theme.breakpoints.down("md")]: {
                display: "flex",
                float: "right",
              },
            }}
          >
            <TurnLeft
              className="MenuCloseIcon"
              sx={{
                color: "#5e35b1",
                fontSize: "smaller",
                p: 0,
                "&:hover": {
                  color: "whitesmoke",
                },
              }}
            />
          </MuiIconButton>
        </DrawerHeader>
        <DrawerList handleDrawerToggle={handleDrawerToggle} />
      </MuiDrawer>
    </>
  );
};
