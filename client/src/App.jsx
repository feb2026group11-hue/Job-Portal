import { Toaster } from "react-hot-toast";
import "./App.css";
import RouteingFile from "./RouteFile/RoutingFile";

// export const UserContext1 = createContext();

function App() {

  return (
    <>
      <RouteingFile />
      <Toaster />
    </>
  );
}

export default App;
// git push -u origin main
