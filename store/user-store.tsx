import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { hashSessionStorage } from "./hashStorage";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user: any) => set(() => ({ user })),
            clearUser: () => set(() => ({ user: null })),
        }),
        {
            name: 'user-storage', // unique name
            storage: createJSONStorage(() => hashSessionStorage),
        },
    ),
)