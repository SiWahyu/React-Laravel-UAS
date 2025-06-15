import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login = async (data) => {
  const response = await api.post("/login", data, {
    headers: {
      Accept: "application/json",
    },
  });

  return response.data;
};

export const logout = async (token) => {
  const response = await api.get("/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response;
};

export const getUser = async (token) => {
  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};
