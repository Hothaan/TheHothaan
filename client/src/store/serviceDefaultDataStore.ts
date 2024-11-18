import { create } from "zustand";

type TserviceDefaultData = {
  serviceTitle: string;
  serviceDesc: string;
  device: number | null;
  serviceType: number | null;
};

declare interface IserviceDefaultDataStore {
  serviceDefaultData: TserviceDefaultData;
  setServiceDefaultData: (newData: TserviceDefaultData) => void;
}

export const serviceDefaultDataStore = create<IserviceDefaultDataStore>()(
  (set) => ({
    serviceDefaultData: {
      serviceTitle: "",
      serviceDesc: "",
      device: null,
      serviceType: null,
    },
    setServiceDefaultData: (newData: TserviceDefaultData) =>
      set({ serviceDefaultData: newData }),
  })
);
