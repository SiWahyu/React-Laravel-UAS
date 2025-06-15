import { create } from "zustand";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  updateSupplier,
} from "../services/supplierService";

const useSupplierStore = create((set, get) => ({
  suppliers: [],
  loading: false,
  message: null,
  notFound: false,
  success: false,

  fetchSuppliers: async () => {
    set({ loading: true });
    try {
      const response = await getSupplier();

      set({ suppliers: response, loading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  findSupplierById: (id) => {
    const supplier = get().suppliers.find(
      (item) => item.id.toString() === id.toString()
    );

    if (!supplier) {
      set({ notFound: true });
    }
    return supplier;
  },

  addSupplier: async (data) => {
    set({ loading: true });
    try {
      const response = await createSupplier(data);
      set({
        suppliers: [...get().suppliers, response.data],
        message: response.message,
      });

      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message || "Failed to create supplier";
      set({ errorMessage: errorMessage, success: false });

      return { message: errorMessage, success: false };
    } finally {
      set({ loading: false });
    }
  },

  editSupplier: async (id, data) => {
    try {
      const response = await updateSupplier(id, data);

      console.log(response);

      const update = get().suppliers.map((item) => {
        if (parseInt(item.id) === parseInt(id)) {
          return { ...item, ...response.data };
        }
        return item;
      });

      set({ suppliers: update, message: response.message });

      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to create supplier";
      set({ errorMessage: errorMessage, success: false });

      return { message: errorMessage, success: false };
    }
  },

  deleteSupplier: async (id) => {
    try {
      const response = await deleteSupplier(id);
      const { suppliers } = get();
      set({
        suppliers: suppliers.filter((item) => item.id !== id),
        message: response.message,
      });
      return { message: response.message, success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create supplier";
      set({ errorMessage: errorMessage, success: false });

      return { message: errorMessage, success: false };
    }
  },
}));

export default useSupplierStore;
