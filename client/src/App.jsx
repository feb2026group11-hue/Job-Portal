import { Toaster } from "react-hot-toast";
import "./App.css";
import RouteingFile from "./Dashboard_Components/RouteFile/RoutingFile";

// export const UserContext1 = createContext();

function App() {
  // const [user,setUser]=useState("manish");

  return (
    <>
      <RouteingFile />
      <Toaster />
    </>
  );
}

export default App;
// git push -u origin main
