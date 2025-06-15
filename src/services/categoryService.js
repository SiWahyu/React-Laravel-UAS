import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCategory = async () => {
  try {
    const response = await api.get("/categories", {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post("/categories", data, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateCategory = async (id, data) => {
  try {
    const response = await api.patch(`/categories/${id}`, data, {
      headers: {
        Accept: "application/json",
      },
      method: "PATCH",
    });
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};
