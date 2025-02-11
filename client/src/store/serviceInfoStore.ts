import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IserviceInfo {
  serviceInfo: { serviceTitle: string; serviceDesc: string };
  setServiceInfo: (newData: {
    serviceTitle: string;
    serviceDesc: string;
  }) => void;
}

export const serviceInfoStore = create<IserviceInfo>()(
  persist(
    (set) => ({
      serviceInfo: { serviceTitle: "", serviceDesc: "" },
      setServiceInfo: (newData) => set({ serviceInfo: newData }),
    }),
    { name: "serviceInfo" }
  )
);
