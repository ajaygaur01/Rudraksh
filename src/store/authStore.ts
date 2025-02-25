import axios from "axios";
import { create } from "zustand";

interface AuthState {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (email, password) => {
    try {
        try {
          await axios.post("http://localhost:3000/api/auth/login" ,{email,password})
          alert("Registered Successfully")
        } catch (error) {
          console.log(error)
          alert("error while login")
        }

      } catch (error) {
        console.error('Login failed:', error);
      }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      set({ user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  fetchUser: async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        set({ user: data.user });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },
}));