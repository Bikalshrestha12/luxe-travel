import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "user";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  joinedAt: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setLoading: (v: boolean) => void;
}

// Mock users database
const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: "admin-001",
    name: "Alexandra Chen",
    email: "admin@luxetravel.co",
    password: "admin123",
    role: "admin",
    avatar: "AC",
    joinedAt: "2023-01-15",
  },
  {
    id: "user-001",
    name: "Marcus Beaumont",
    email: "user@luxetravel.co",
    password: "user123",
    role: "user",
    avatar: "MB",
    joinedAt: "2024-03-20",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 1200));

        const found = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (found) {
          const { password: _pw, ...user } = found;
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        set({ isLoading: false });
        return { success: false, error: "Invalid email or password" };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setLoading: (v) => set({ isLoading: v }),
    }),
    {
      name: "luxe-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
