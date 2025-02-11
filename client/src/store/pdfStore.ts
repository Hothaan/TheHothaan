import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IpdfStore {
  pdf: string | null;
  setPdf: (newData: string | null) => void;
}

export const pdfStore = create<IpdfStore>()(
  persist(
    (set) => ({
      pdf: null,
      setPdf: (newData) => set({ pdf: newData }),
    }),
    { name: "pdf" }
  )
);
