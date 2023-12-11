import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { User } from "@/types";

interface StoreState {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

const userInitialData: User = { _id: "", name: "", phone: 0, role: "" };

export const useStore = create<StoreState>()(
  devtools((set) => ({
    user: userInitialData,
    setUser: (user: User) => set(() => ({ user })),
    removeUser: () => set(() => ({ user: userInitialData })),
  }))
);
