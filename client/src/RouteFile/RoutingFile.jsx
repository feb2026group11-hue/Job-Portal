import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
import { Dashboard } from "../Dashboard_Components/Dashboard/DashboardMain/Dashboard";
import Loader from "../Dashboard_Components/Dashboard/ExtraPages/Loader";

const AuthGuard = React.lazy(() => import("../RouteFile/AuthGuard"));
const Home = React.lazy(
  () => import("../Dashboard_Components/Login/LandingPage"),
);
const DashboardLogin = React.lazy(
  () => import("../Dashboard_Components/Login/DashboardLogin"),
);
const ForgotPassword = React.lazy(
  () => import("../Dashboard_Components/Login/ForgotPassword"),
);
const DontHaveAccount = React.lazy(
  () => import("../Dashboard_Components/Login/DontHaveAccount"),
);
const CandidateProfile = React.lazy(() => import("../Pages/CandidateProfile"));
const CandidateHome = React.lazy(() => import("../Pages/Candidate/Home"));
const CandidateJobs = React.lazy(() => import("../Pages/Candidate/Jobs"));
const CandidateSavedJobs = React.lazy(() => import("../Pages/Candidate/SavedJobs"));
const CandidateAppliedJobs = React.lazy(() => import("../Pages/Candidate/AppliedJobs"));
const CandidateCompanies = React.lazy(() => import("../Pages/Candidate/Companies"));
const CandidateMessages = React.lazy(() => import("../Pages/Candidate/Messages"));
const CandidateNotifications = React.lazy(() => import("../Pages/Candidate/Notifications"));
const CandidateSettings = React.lazy(() => import("../Pages/Candidate/Settings"));
const EmployerProfile = React.lazy(() => import("../Pages/Employer/EmployerProfile"));
const PostJob = React.lazy(() => import("../Pages/Employer/PostJob"));
const EmployerHome = React.lazy(() => import("../Pages/Employer/EmployerHome"));
const ManageJobs = React.lazy(() => import("../Pages/Employer/ManageJobs"));
const ReceivedApplication = React.lazy(() => import("../Pages/Employer/ReceivedApplication"));
const JobApplications = React.lazy(() => import("../Pages/Employer/JobApplications"));
const ShortlistedJobs = React.lazy(() => import("../Pages/Employer/ShortlistedJobs"));
const PageNotFound404 = React.lazy(() => import("../Dashboard_Components/Dashboard/ExtraPages/PageNotFound404"));
const AdminHome = React.lazy(() => import("../Pages/Admin/AdminDashboard"));

const DashboardRoleIndex = () => {
  const role = localStorage.getItem("role");
  if (role?.toUpperCase() === "ADMIN") {
    return <AdminHome />;
  }
  if (role?.toUpperCase() === "EMPLOYER") {
    return <EmployerHome />;
  }
  return <CandidateHome />;
};

const RouteingFile = () => {
  // const navigate = useNavigate();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <DashboardLogin />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/signup",
      element: <DontHaveAccount />,
    },
    //   {
    //     path: "/unauthorized",
    //     element: <Unauthorized />,
    //   },
    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <DashboardRoleIndex />,
        },
        // for Admin
        {
          path: "/dashboard/admin/home",
          element: <AdminHome />,
        },
        {
          path: "/dashboard/admin",
          element: <AdminHome />,
        },
        {
          path: "/dashboard/admin/users",
          element: <AdminHome />,
        },
        {
          path: "/dashboard/candidate-profile",
          element: <CandidateProfile />,
        },
        {
          path: "/dashboard/candidate/home",
          element: <CandidateHome />,
        },
        {
          path: "/dashboard/candidate/jobs",
          element: <CandidateJobs />,
        },
        {
          path: "/dashboard/candidate/saved-jobs",
          element: <CandidateSavedJobs />,
        },
        {
          path: "/dashboard/candidate/applied-jobs",
          element: <CandidateAppliedJobs />,
        },
        {
          path: "/dashboard/candidate/companies",
          element: <CandidateCompanies />,
        },
        //for Employer
        {
          path: "/dashboard/employer-profile",
          element: <EmployerProfile />,
        },
        {
          path: "/dashboard/employer/post-job",
          element: <PostJob />,
        },
        {
          path: "/dashboard/employer",
          element: <EmployerHome />,
        },
        {
          path: "/dashboard/employer/manage-job",
          element: <ManageJobs />,
        },
        {
          path: "/dashboard/employer/job-applications",
          element: <JobApplications />,
        },
        {
          path: "/dashboard/employer/applications/:jobId",
          element: <ReceivedApplication />,
        },
        {
          path: "/dashboard/employer/shortlisted-jobs",
          element: <ShortlistedJobs />,
        },
        {
          path: "/dashboard/employer/shortlisted-jobs/:jobId",
          element: <ReceivedApplication onlyShortlisted={true} />,
        },
        {
          path: "/dashboard/candidate/messages",
          element: <CandidateMessages />,
        },
        {
          path: "/dashboard/candidate/notifications",
          element: <CandidateNotifications />,
        },
        {
          path: "/dashboard/candidate/settings",
          element: <CandidateSettings />,
        },
        //   {
        //     path: "/dashboard/statistics",
        //     element: <Statastics />,
        //   },
        //   {
        //     path: "/dashboard/data",
        //     element: <CommingSoon />,
        //   },
        //   {
        //     path: "/dashboard/chat",
        //     element: <ChatComponent />,
        //   },
        //   {
        //     path: "/dashboard/mail",
        //     element: <MailComponent />,
        //   },
        //   {
        //     path: "/dashboard/calender",
        //     element: <Calender />,
        //   },
        //   {
        //     path: "/dashboard/ecommerce",
        //     element: <CommingSoon />,
        //   },
        //   {
        //     path: "/dashboard/invoice",
        //     element: <CommingSoon />,
        //   },
        //   {
        //     path: "/dashboard/CRM",
        //     element: <CommingSoon />,
        //   },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound404 />,
    },
  ]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};
export default RouteingFile;
