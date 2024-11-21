import { create } from "zustand";

// type TserviceDefaultData = {
//   serviceTitle: string;
//   serviceDesc: string;
//   device: number | null;
//   serviceType: number | null;
// };

export type TserviceDefaultData = {
  serviceTitle: string;
  serviceDesc: string;
  device: {
    number: number | null;
    text: string | null;
  };
  serviceType: {
    number: number | null;
    text: string | null;
  };
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
      device: { number: null, text: null },
      serviceType: { number: null, text: null },
    },
    setServiceDefaultData: (newData: TserviceDefaultData) =>
      set({ serviceDefaultData: newData }),
  })
);
