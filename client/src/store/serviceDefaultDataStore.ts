import { create } from "zustand";
import { TserviceDataKey } from "@data/service/serviceData";

// type TserviceDefaultData = {
//   serviceTitle: string;
//   serviceDesc: string;
//   device: Tdevice | "";
//   service: TserviceDataKey | "";
// };

type TserviceDefaultData = {
  serviceTitle: string;
  serviceDesc: string;
  device: number | null;
  service: number | null;
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
      service: null,
    },
    setServiceDefaultData: (newData: TserviceDefaultData) =>
      set({ serviceDefaultData: newData }),
  })
);
