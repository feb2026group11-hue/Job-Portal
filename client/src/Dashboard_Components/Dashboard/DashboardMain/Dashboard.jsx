import { CssBaseline } from "@mui/material";
import { MuiBox, MuiThemeProvider } from "../../../MUIComponents/Mui";
import { Appbar } from "../AppBar/Appbar";
import PageWarpperMainDashboardPage from "./PagesWrapperMainDashboardPage";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";
=======
import { Outlet, useNavigate } from "react-router-dom";
>>>>>>> origin/main
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../../Theme/Theme";
import "../../Css/DashboardAll.css";
export const Dashboard = () => {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> origin/main
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("Mode") || "light"
  );
  const [dashTheme, setDashTheme] = useState(lightTheme);
  const toggleDarkMode = () => {
    const newMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newMode);
    localStorage.setItem("Mode", newMode);
    document.documentElement.setAttribute(
      "data-theme",
      dashTheme.palette.mode === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
<<<<<<< HEAD
    const storedMode = localStorage.getItem("Mode");
=======
    
    const storedMode = localStorage.getItem("Mode");
    // localStorage.getItem("isAuthenticated") != true ? navigate("/") : "";
    
>>>>>>> origin/main
    if (storedMode) {
      setDarkMode(storedMode);
      setDarkMode("light");
    }
  }, []);
<<<<<<< HEAD
=======

>>>>>>> origin/main
  useEffect(() => {
    setDashTheme(darkMode === "dark" ? darkTheme : lightTheme);
    localStorage.setItem("dashTheme", dashTheme);
  }, [darkMode]);
  return (
    <>
      <MuiThemeProvider theme={dashTheme}>
        <MuiBox className="wrapper1 overflow-aut">
          <CssBaseline />
          <Appbar
            className="borderss"
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />

          <PageWarpperMainDashboardPage>
            <Outlet />
          </PageWarpperMainDashboardPage>
        </MuiBox>
      </MuiThemeProvider>
    </>
  );
};
