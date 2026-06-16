import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
import { Dashboard } from "../Dashboard_Components/Dashboard/DashboardMain/Dashboard";
import Loader from "../Dashboard_Components/Dashboard/Pages/Loader";

const Home = React.lazy(()=> import("../Dashboard_Components/Login/LandingPage"));
const DashboardLogin = React.lazy(() => import("../Dashboard_Components/Login/DashboardLogin"));
const ForgotPassword = React.lazy(() => import("../Dashboard_Components/Login/ForgotPassword"));
const DontHaveAccount = React.lazy(() => import("../Dashboard_Components/Login/DontHaveAccount"));
const CandidateProfile = React.lazy(()=>import("../Pages/CandidateProfile"));
const RouteingFile = () => {
  // const navigate = useNavigate();

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home />,
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
      element: <Dashboard />,
      children: [
        // {
        //   index: true,
        //   path: "/dashboard/home",
        //   element: <DefaultHome />,
        // },
        {
          path: "/dashboard/candidate-profile",
          element: <CandidateProfile />,
        },
      //   {
      //     path: "/dashboard/user",
      //     element: <UsersTable />,
      //   },
      //   {
      //     path: "/dashboard/contacts/cards",
      //     element: <Contacts />,
      //   },
      //   {
      //     path: "/dashboard/contacts/list",
      //     element: <ContactsList />,
      //   },
      //   {
      //     path: "/dashboard/customer",
      //     element: <CustomerTable />,
      //   },
      //   {
      //     path: "/dashboard/analytics",
      //     element: <Analytics />,
      //   },
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
      // element: <PageNotFound404 />,
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
