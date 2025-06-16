import { create } from "zustand";
import { getDashboardData } from "../services/dashboardService";

const useDashboardStore = create((set) => ({
  data: [],
  loading: false,
  message: null,
  success: false,

  fetchData: async () => {
    set({ loading: true });

    try {
      const response = await getDashboardData();

      set({ data: response });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;
