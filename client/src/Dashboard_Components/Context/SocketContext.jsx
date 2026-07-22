import createContext from "react";
import useState from "react";
export const SocketContext = createContext();

export const SocetContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};
