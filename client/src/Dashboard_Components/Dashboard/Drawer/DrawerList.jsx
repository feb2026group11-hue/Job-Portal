import "./Drawer.css";
import {
  MuiDivider,
  MuiList,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
  MuiTypography,
} from "../../../MUIComponents/Mui";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";



import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';

const DrawerList = ({ handleDrawerToggle }) => {
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    <>
      <MuiList
        className="drawer-list"
        sx={{
          mx: 2,
          "&:hover": {
            backgroundColor: "transparent",
            "&.MuiListItemIcon-root, & .MuiListItemText-root": {
              color: "#364152",
              fontWeight: "normal",
            },
          },
        }}
      >
        <MuiTypography className="list-item-title">Dashboard</MuiTypography>

        {(role == "ADMIN" ? AdminDashboardTabs : role == "EMPLOYER" ? EmployerDashboardTabs : CandidateDashboardTabs).map((link, i) => {
          return (
            <TabMenu
              key={i}
              id={link.id}
              icon={link.icon}
              title={link.title}
              path={link.path}
              childrens={link.childrens}
              exact={true}
              handleDrawerToggle={handleDrawerToggle}
            />
          );
        })}

        <MuiDivider sx={{ my: 1 }} />

        <MuiTypography className="list-item-title">Widget</MuiTypography>

        {(role == "ADMIN" ? AdminWidgetTabs : role == "EMPLOYER" ? EmployerWidgetTabs : CandidateWidgetTabs).map((link, i) => {
          return (
            <TabMenu
              key={i}
              id={link.id}
              icon={link.icon}
              title={link.title}
              path={link.path}
              childrens={link.childrens}
              exact={true}
              handleDrawerToggle={handleDrawerToggle}
            />
          );
        })}

        <MuiDivider sx={{ my: 1 }} />

        <MuiTypography className="list-item-title">Application</MuiTypography>

        {(role == "ADMIN" ? AdminApplicationTabs : role == "EMPLOYER" ? EmployerApplicationTabs : CandidateApplicationTabs).map((link, i) => {
          return (
            <TabMenu
              key={i}
              id={link.id}
              icon={link.icon}
              title={link.title}
              path={link.path}
              childrens={link.childrens}
              exact={true}
              handleDrawerToggle={
                link.title == "Contact" ? "" : handleDrawerToggle
              }
            />
          );
        })}

        <MuiDivider sx={{ my: 1 }} />
      </MuiList>

      <MuiDivider sx={{ borderColor: "white" }} />
    </>
  );
};

const TabMenu = ({
  icon,
  title,
  path,
  childrens,
  exact,
  handleDrawerToggle,
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    // setOpen(true);
  };
  const mediaQuery = window.matchMedia("(max-width: 900px)");
  const handleItemClick = () => {
    if (mediaQuery.matches) {
      handleDrawerToggle();
    } else {
      handleClick();
    }
  };

  return (
    <div onClick={() => (mediaQuery.matches ? handleItemClick() : "")}>
      <MuiListItemButton
        onClick={handleClick}
        className="list-item"
        disablepadding
        as={childrens ? "" : NavLink}
        to={path}
        end={exact}
      >
        <MuiListItemIcon>{icon}</MuiListItemIcon>
        <MuiListItemText>
          <MuiTypography className="list-item-text">{title}</MuiTypography>
        </MuiListItemText>

        {childrens &&
          childrens?.length > 0 &&
          (open ? (
            <ExpandLess className="list-item-icon" />
          ) : (
            <ExpandMore className="list-item-icon" />
          ))}
      </MuiListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {childrens && childrens.length > 0 && (
          <MuiList component="div" disablepadding>
            {childrens.map((child) => (
              <MuiListItemButton
                sx={{ pl: 4 }}
                key={child.id}
                as={NavLink}
                to={child.path}
                className="list-item"
              >
                <MuiListItemIcon>{child.icon}</MuiListItemIcon>
                <MuiListItemText>
                  <MuiTypography className="list-item-text">
                    {child.title}
                  </MuiTypography>
                </MuiListItemText>
              </MuiListItemButton>
            ))}
          </MuiList>
        )}
      </Collapse>
    </div>
  );
};


// ==========================================
// 1. CANDIDATE / JOB SEEKER TABS
// ==========================================
export const CandidateDashboardTabs = [
  {
    id: 101,
    title: "Dashboard",
    icon: <DashboardOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/candidate/home",
  },
];

export const CandidateWidgetTabs = [
  {
    id: 102,
    title: "Jobs",
    icon: <WorkOutlineIcon className="list-item-icon" />,
    childrens: [
      {
        id: 1021,
        title: "Browse Jobs",
        icon: <WorkOutlineIcon />,
        path: "/dashboard/candidate/jobs",
      },
      {
        id: 1022,
        title: "Saved Jobs",
        icon: <BookmarkBorderIcon />,
        path: "/dashboard/candidate/saved-jobs",
      },
      {
        id: 1023,
        title: "Applied Jobs",
        icon: <AssignmentTurnedInOutlinedIcon />,
        path: "/dashboard/candidate/applied-jobs",
      },
    ],
  },
];

export const CandidateApplicationTabs = [
  {
    id: 103,
    title: "Profile",
    icon: <PersonOutlineOutlinedIcon className="list-item-icon" />,
    childrens: [
      {
        id: 1031,
        title: "My Profile",
        icon: <PersonOutlineOutlinedIcon />,
        path: "/dashboard/candidate-profile",
      },
      {
        id: 1032,
        title: "Upload Resume",
        icon: <DescriptionOutlinedIcon />,
        path: "/dashboard/candidate/upload-resume",
      },
    ],
  },
  {
    id: 104,
    title: "Companies",
    icon: <BusinessCenterOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/candidate/companies",
  },
  {
    id: 105,
    title: "Messages",
    icon: <ChatBubbleOutlineIcon className="list-item-icon" />,
    path: "/dashboard/candidate/messages",
  },
  {
    id: 106,
    title: "Notifications & Alerts",
    icon: <NotificationsNoneOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/candidate/notifications",
  },
  {
    id: 107,
    title: "Settings",
    icon: <SettingsOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/candidate/settings",
  },
];

// ==========================================
// 2. EMPLOYER / RECRUITER TABS
// ==========================================
export const EmployerDashboardTabs = [
  {
    id: 201,
    title: "Dashboard",
    icon: <DashboardOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/employer/home",
  },
];

export const EmployerWidgetTabs = [
  {
    id: 202,
    title: "Job Management",
    icon: <ListAltIcon className="list-item-icon" />,
    childrens: [
      {
        id: 2021,
        title: "Post a New Job",
        icon: <PostAddIcon />,
        path: "/dashboard/employer/post-job",
      },
      {
        id: 2022,
        title: "Manage Job Posts",
        icon: <ListAltIcon />,
        path: "/dashboard/employer/manage-job",
      },
    ],
  },
  {
    id: 203,
    title: "Applications",
    icon: <PeopleOutlineIcon className="list-item-icon" />,
    childrens: [
      {
        id: 2031,
        title: "Received Applications",
        icon: <PeopleOutlineIcon />,
        path: "/dashboard/employer/job-applications",
      },
      {
        id: 2032,
        title: "Shortlisted / Interviews",
        icon: <AssignmentIndIcon />,
        path: "/dashboard/employer/shortlisted-jobs",
      },
    ],
  },
];

export const EmployerApplicationTabs = [
  {
    id: 204,
    title: "Company Profile",
    icon: <BusinessIcon className="list-item-icon" />,
    path: "/dashboard/employer-profile",
  },
  {
    id: 205,
    title: "Messages",
    icon: <ChatBubbleOutlineIcon className="list-item-icon" />,
    path: "/dashboard/employer/messages",
  },
  {
    id: 206,
    title: "Notifications",
    icon: <NotificationsNoneOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/employer/notifications",
  },
  {
    id: 207,
    title: "Settings",
    icon: <SettingsOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/employer/settings",
  },
];

// ==========================================
// 3. ADMIN TABS
// ==========================================
export const AdminDashboardTabs = [
  {
    id: 301,
    title: "Admin Dashboard",
    icon: <DashboardOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/admin/home",
  },
];

export const AdminWidgetTabs = [
  {
    id: 302,
    title: "User Management",
    icon: <GroupIcon className="list-item-icon" />,
    childrens: [
      {
        id: 3021,
        title: "All Users",
        icon: <GroupIcon />,
        path: "/dashboard/admin/users",
      },
      {
        id: 3022,
        title: "Employer Verification",
        icon: <VerifiedUserIcon />,
        path: "/dashboard/admin/verify-employers",
      },
    ],
  },
  {
    id: 303,
    title: "Content & Moderation",
    icon: <SecurityIcon className="list-item-icon" />,
    childrens: [
      {
        id: 3031,
        title: "Verify Job Posts",
        icon: <SecurityIcon />,
        path: "/dashboard/admin/verify-jobs",
      },
      {
        id: 3032,
        title: "Manage Categories",
        icon: <CategoryIcon />,
        path: "/dashboard/admin/categories",
      },
    ],
  },
];

export const AdminApplicationTabs = [
  {
    id: 304,
    title: "Reports & Analytics",
    icon: <AssessmentIcon className="list-item-icon" />,
    path: "/dashboard/admin/reports",
  },
  {
    id: 305,
    title: "System Notifications",
    icon: <NotificationsNoneOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/admin/notifications",
  },
  {
    id: 306,
    title: "Global Settings",
    icon: <SettingsOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/admin/settings",
  },
];

export default DrawerList;
