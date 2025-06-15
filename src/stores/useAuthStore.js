import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUser, login, logout } from "../services/authService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      loginUser: async (data) => {
        set({ loading: true });
        try {
          const response = await login(data);
          if (response.auth_token) {
            set({
              user: response.user,
              token: response.auth_token,
            });
          }
          console.log(response);
          return response;
        } catch (error) {
          console.error("Login failed:", error);
          set({ error: error.response.data.message });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      logoutUser: async () => {
        const token = get().token;
        try {
          await logout(token);
        } catch (error) {
          console.error("Logout error:", error);
        }
        set({ user: null, token: null });
      },

      fetchUser: async () => {
        set({ loading: true });
        const token = get().token;
        if (!token) {
          set({ user: null, loading: false });
          return;
        }
        try {
          const response = await getUser(token);
          console.log(response);
          if (response?.user) {
            set({ user: response.user });
          } else {
            // set({ user: null, token: null });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          set({ user: null, token: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
