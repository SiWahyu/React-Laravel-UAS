import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getSupplier = async () => {
  try {
    const response = await api.get("/suppliers", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSupplier = async (data) => {
  try {
    const response = await api.post("/suppliers", data);
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};

export const getSupplierById = async (id) => {
  try {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};
export const updateSupplier = async (id, data) => {
  try {
    const response = await api.patch(`/suppliers/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};
