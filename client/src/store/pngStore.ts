import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IpngStore {
  png: string | null;
  setPng: (newData: string | null) => void;
}

export const pngStore = create<IpngStore>()(
  persist(
    (set) => ({
      png: null,
      setPng: (newData) => set({ png: newData }),
    }),
    { name: "png" }
  )
);
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("png");
// });
