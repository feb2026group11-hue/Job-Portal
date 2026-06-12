import { styled } from "@mui/material";
import { propTypes } from "react-bootstrap/esm/Image";
import "../../Css/DashboardAll.css";
import PropTypes from "prop-types";
export const PageWarpperMainDashboardPage = (props) => {
  const drawerWidth = 240;

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme }) => ({
      // position:'relative',
      flexGrow: 1,
      padding: theme.spacing(1), // padding for all childs of dashboard
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `${drawerWidth}px`,
      [theme.breakpoints.down("md")]: {
        margin: "65px 0px 0px 0px",
        padding: "0px",
      },
      variants: [
        {
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          props: ({ open }) => open,
          style: {
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          },
        },
      ],
    })
  );

  return (
    <>
      <Main
        className="wrapper2 p-2"
        sx={{
          mt: "65px",
          width: `calc(100% - ${drawerWidth})`,

          overflowX: "auto",
        }}
        {...props}
      >
        {props.children}
      </Main>
    </>
  );
};

PageWarpperMainDashboardPage.propTypes = {
  children: PropTypes.any,
};

export default PageWarpperMainDashboardPage;
