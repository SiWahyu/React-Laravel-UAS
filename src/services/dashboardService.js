import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getDashboardData = async () => {
  const response = await api.get("/dashboard", {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};
