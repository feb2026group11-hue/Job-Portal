import axios from "axios";
export const LoggedUser = async () => {
  const token = localStorage.getItem("Token");
  try {
    const response = await axios.get(
      "https://node-js-view-point.onrender.com/api/users/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
