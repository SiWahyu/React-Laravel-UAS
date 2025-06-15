import { create } from "zustand";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../services/productService";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  message: null,
  notFound: false,
  success: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await getProduct();

      set({ products: response, loading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  findProductById: (id) => {
    const product = get().products.find(
      (item) => item.id.toString() === id.toString()
    );

    if (!product) {
      set({ notFound: true });
    }
    return product;
  },

  addProduct: async (data) => {
    set({ loading: true });
    try {
      const response = await createProduct(data);
      set({
        products: [...get().products, response.data],
        message: response.message,
      });
      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message || "Failed to create category";
      set({ errorMessage: error.response.data.message });

      return { message: errorMessage, success: false };
    } finally {
      set({ loading: false });
    }
  },

  editProduct: async (id, data) => {
    try {
      const response = await updateProduct(id, data);

      console.log(response);

      const update = get().products.map((item) => {
        if (parseInt(item.id) === parseInt(id)) {
          return { ...item, ...response.data };
        }
        return item;
      });

      set({ products: update, message: response.message, success: true });
      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to create category";
      set({ errorMessage: error.response.data.message });

      return { message: errorMessage, success: false };
    }
  },

  removeProduct: async (id) => {
    try {
      const response = await deleteProduct(id);
      const { products } = get();
      set({
        products: products.filter((item) => item.id !== id),
        message: response.message,
        success: true,
      });

      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message || "Failed to create category";
      set({ errorMessage: error.response.data.message });

      return { message: errorMessage, success: false };
    }
  },
}));

export default useProductStore;
