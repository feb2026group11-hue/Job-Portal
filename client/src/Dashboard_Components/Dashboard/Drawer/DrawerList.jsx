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


const DrawerList = ({ handleDrawerToggle }) => {
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
        {DashboardTabs.map((link, i) => {
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
        {WidgetTabs.map((link, i) => {
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
        {ApplicationTabs.map((link, i) => {
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

const DashboardTabs = [
  {
    id: 1,
    title: "Dashboard",
    icon: <DashboardOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/home",
  },
];

const WidgetTabs = [
  {
    id: 1,
    title: "Jobs",
    icon: <WorkOutlineIcon className="list-item-icon" />,
    childrens: [
      {
        id: 11,
        title: "Browse Jobs",
        icon: <WorkOutlineIcon />,
        path: "/dashboard/jobs",
      },
      {
        id: 12,
        title: "Recommended Jobs",
        icon: <BookmarkBorderIcon />,
        path: "/dashboard/recommended-jobs",
      },
      {
        id: 13,
        title: "Saved Jobs",
        icon: <BookmarkBorderIcon />,
        path: "/dashboard/saved-jobs",
      },
      {
        id: 14,
        title: "Applied Jobs",
        icon: <AssignmentTurnedInOutlinedIcon />,
        path: "/dashboard/applied-jobs",
      },
    ],
  },
];

const ApplicationTabs = [
  {
    id: 1,
    title: "Profile",
    icon: <PersonOutlineOutlinedIcon className="list-item-icon" />,
    childrens: [
      {
        id: 21,
        title: "My Profile",
        icon: <PersonOutlineOutlinedIcon />,
        path: "/dashboard/profile",
      },
      {
        id: 22,
        title: "Resume Builder",
        icon: <DescriptionOutlinedIcon />,
        path: "/dashboard/resume-builder",
      },
      {
        id: 23,
        title: "Upload Resume",
        icon: <DescriptionOutlinedIcon />,
        path: "/dashboard/upload-resume",
      },
    ],
  },

  {
    id: 2,
    title: "Companies",
    icon: <BusinessCenterOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/companies",
  },

  {
    id: 3,
    title: "Messages",
    icon: <ChatBubbleOutlineIcon className="list-item-icon" />,
    path: "/dashboard/messages",
  },

  {
    id: 4,
    title: "Notifications",
    icon: <NotificationsNoneOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/notifications",
  },

  {
    id: 5,
    title: "Settings",
    icon: <SettingsOutlinedIcon className="list-item-icon" />,
    path: "/dashboard/settings",
  },
];

// const WidgetTabsAdmin = [
//   {
//     id: 1,
//     title: "User Management",
//     icon: <PeopleOutlineIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 11,
//         title: "All Users",
//         icon: <PeopleOutlineIcon />,
//         path: "/admin/users/all",
//       },
//       {
//         id: 12,
//         title: "Job Seekers",
//         icon: <PersonOutlineOutlinedIcon />,
//         path: "/admin/users/job-seekers",
//       },
//       {
//         id: 13,
//         title: "Employers",
//         icon: <BusinessCenterOutlinedIcon />,
//         path: "/admin/users/employers",
//       },
//       {
//         id: 14,
//         title: "User Roles",
//         icon: <ShieldOutlineIcon />,
//         path: "/admin/users/roles",
//       },
//     ],
//   },

//   {
//     id: 2,
//     title: "Job Management",
//     icon: <WorkOutlineIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 21,
//         title: "All Jobs",
//         icon: <WorkOutlineIcon />,
//         path: "/admin/jobs/all",
//       },
//       {
//         id: 22,
//         title: "Pending Jobs",
//         icon: <ScheduleOutlinedIcon />,
//         path: "/admin/jobs/pending",
//       },
//       {
//         id: 23,
//         title: "Approved Jobs",
//         icon: <CheckCircleOutlineIcon />,
//         path: "/admin/jobs/approved",
//       },
//       {
//         id: 24,
//         title: "Rejected Jobs",
//         icon: <ClearOutlineIcon />,
//         path: "/admin/jobs/rejected",
//       },
//     ],
//   },

//   {
//     id: 3,
//     title: "Company Management",
//     icon: <BusinessOutlinedIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 31,
//         title: "All Companies",
//         icon: <BusinessOutlinedIcon />,
//         path: "/admin/companies/all",
//       },
//       {
//         id: 32,
//         title: "Verified Companies",
//         icon: <VerifiedOutlinedIcon />,
//         path: "/admin/companies/verified",
//       },
//       {
//         id: 33,
//         title: "Pending Verification",
//         icon: <HourglassEmptyIcon />,
//         path: "/admin/companies/pending",
//       },
//     ],
//   },
// ];

// const ApplicationTabsAdmin = [
//   {
//     id: 1,
//     title: "Applications",
//     icon: <AssignmentTurnedInOutlinedIcon className="list-item-icon" />,
//     path: "/admin/applications",
//   },

//   {
//     id: 2,
//     title: "Reports & Analytics",
//     icon: <AssessmentIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 21,
//         title: "Dashboard Stats",
//         icon: <AnalyticsIcon />,
//         path: "/admin/reports/dashboard",
//       },
//       {
//         id: 22,
//         title: "Job Reports",
//         icon: <DocumentScanIcon />,
//         path: "/admin/reports/jobs",
//       },
//       {
//         id: 23,
//         title: "User Reports",
//         icon: <PeopleAltIcon />,
//         path: "/admin/reports/users",
//       },
//       {
//         id: 24,
//         title: "Revenue Reports",
//         icon: <PaymentIcon />,
//         path: "/admin/reports/revenue",
//       },
//     ],
//   },

//   {
//     id: 3,
//     title: "Notifications",
//     icon: <NotificationsNoneOutlinedIcon className="list-item-icon" />,
//     path: "/admin/notifications",
//   },

//   {
//     id: 4,
//     title: "Settings",
//     icon: <SettingsOutlinedIcon className="list-item-icon" />,
//     path: "/admin/settings",
//   },
// ];

// const WidgetTabsEmployer = [
//   {
//     id: 1,
//     title: "Jobs",
//     icon: <WorkOutlineIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 11,
//         title: "Post a Job",
//         icon: <AddCircleOutlineIcon />,
//         path: "/employer/post-job",
//       },
//       {
//         id: 12,
//         title: "My Jobs",
//         icon: <WorkOutlineIcon />,
//         path: "/employer/my-jobs",
//       },
//       {
//         id: 13,
//         title: "Active Jobs",
//         icon: <CheckCircleOutlineIcon />,
//         path: "/employer/active-jobs",
//       },
//       {
//         id: 14,
//         title: "Expired Jobs",
//         icon: <ClockOutlineIcon />,
//         path: "/employer/expired-jobs",
//       },
//     ],
//   },

//   {
//     id: 2,
//     title: "Candidates",
//     icon: <PeopleOutlineIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 21,
//         title: "All Candidates",
//         icon: <PeopleOutlineIcon />,
//         path: "/employer/candidates/all",
//       },
//       {
//         id: 22,
//         title: "Applied Candidates",
//         icon: <AssignmentTurnedInOutlinedIcon />,
//         path: "/employer/candidates/applied",
//       },
//       {
//         id: 23,
//         title: "Saved Candidates",
//         icon: <BookmarkBorderIcon />,
//         path: "/employer/candidates/saved",
//       },
//       {
//         id: 24,
//         title: "Interviewed Candidates",
//         icon: <ChatBubbleOutlineIcon />,
//         path: "/employer/candidates/interviewed",
//       },
//     ],
//   },

//   {
//     id: 3,
//     title: "Profile",
//     icon: <PersonOutlineOutlinedIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 31,
//         title: "Company Profile",
//         icon: <PersonOutlineOutlinedIcon />,
//         path: "/employer/profile",
//       },
//       {
//         id: 32,
//         title: "Company Details",
//         icon: <BusinessCenterOutlinedIcon />,
//         path: "/employer/company-details",
//       },
//       {
//         id: 33,
//         title: "Upload Documents",
//         icon: <DescriptionOutlinedIcon />,
//         path: "/employer/upload-documents",
//       },
//     ],
//   },
// ];

// const ApplicationTabsEmployer = [
//   {
//     id: 1,
//     title: "Applications",
//     icon: <AssignmentTurnedInOutlinedIcon className="list-item-icon" />,
//     path: "/employer/applications",
//   },

//   {
//     id: 2,
//     title: "Messages",
//     icon: <ChatBubbleOutlineIcon className="list-item-icon" />,
//     path: "/employer/messages",
//   },

//   {
//     id: 3,
//     title: "Notifications",
//     icon: <NotificationsNoneOutlinedIcon className="list-item-icon" />,
//     path: "/employer/notifications",
//   },

//   {
//     id: 4,
//     title: "Settings",
//     icon: <SettingsOutlinedIcon className="list-item-icon" />,
//     path: "/employer/settings",
//   },

//   {
//     id: 5,
//     title: "Billing & Plans",
//     icon: <PaymentIcon className="list-item-icon" />,
//     childrens: [
//       {
//         id: 51,
//         title: "My Plan",
//         icon: <AnnouncementIcon />,
//         path: "/employer/billing/plan",
//       },
//       {
//         id: 52,
//         title: "Transaction History",
//         icon: <ListAltIcon />,
//         path: "/employer/billing/history",
//       },
//       {
//         id: 53,
//         title: "Upgrade Plan",
//         icon: <UpgradeIcon />,
//         path: "/employer/billing/upgrade",
//       },
//     ],
//   },
// ];
export default DrawerList;
