import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  name: string;
  initials: string;
  color: string;
}

interface UserState {
  user: User | null;

  setUser: (user: User | null) => void;
}

const useUserState = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null as User | null,

        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserState;
