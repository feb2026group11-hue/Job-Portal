import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/Store.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

// Intercept all axios requests to route them through the API Gateway (port 8080)
axios.interceptors.request.use(
  (config) => {
    if (config.url) {
      config.url = config.url.replace(/http:\/\/localhost:808[1-9]/, "http://localhost:8080");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
 <Provider store={store}>
        <App />
    </Provider>  
    </StrictMode>
);
