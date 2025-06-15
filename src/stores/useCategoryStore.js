import { create } from "zustand";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../services/categoryService";

const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,
  message: null,
  notFound: false,
  success: false,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await getCategory();

      set({ categories: response, loading: false });
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ loading: false });
    }
  },

  findCategoryById: (id) => {
    const category = get().categories.find(
      (item) => item.id.toString() === id.toString()
    );

    if (!category) {
      set({ notFound: true });
    }
    return category;
  },

  addCategory: async (data) => {
    set({ loading: true });
    try {
      const response = await createCategory(data);
      console.log(response);
      set({
        categories: [...get().categories, response.data],
        message: response.message,
      });
      return { message: response.message, success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create category";
      return { message: errorMessage, success: false };
    } finally {
      set({ loading: false });
    }
  },

  editCategory: async (id, data) => {
    try {
      const response = await updateCategory(id, data);

      const update = get().categories.map((item) => {
        if (parseInt(item.id) === parseInt(id)) {
          return { ...item, ...response.data };
        }
        return item;
      });

      set({ categories: update, message: response.message });

      return { message: response.message, success: true };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete category";

      return { message: errorMessage, success: false };
    }
  },

  removeCategory: async (id) => {
    try {
      const response = await deleteCategory(id);
      const { categories } = get();
      set({ categories: categories.filter((item) => item.id !== id) });

      return { success: true, message: response.message };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete category";
      console.log(error);

      return { success: false, message: errorMessage };
    }
  },
}));

export default useCategoryStore;
