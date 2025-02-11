import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IjpgStore {
  jpg: string | null;
  setJpg: (newData: string | null) => void;
}

export const jpgStore = create<IjpgStore>()(
  persist(
    (set) => ({
      jpg: null,
      setJpg: (newData) => set({ jpg: newData }),
    }),
    { name: "jpg" }
  )
);
