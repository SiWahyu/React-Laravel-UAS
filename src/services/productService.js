import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProduct = async () => {
  try {
    const response = await api.get("/products", {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data) => {
  try {
    const formattedData = {
      ...data,
      price: parseInt(data.price),
      stock: parseInt(data.stock),
      category_id: parseInt(data.category_id),
      supplier_id: parseInt(data.supplier_id),
    };

    const response = await api.post("/products", formattedData, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error");
    throw error;
  }
};
export const updateProduct = async (id, data) => {
  try {
    const formattedData = {
      ...data,
      category_id: parseInt(data.category_id),
      supplier_id: parseInt(data.supplier_id),
    };
    const response = await api.patch(`/products/${id}`, formattedData, {
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
