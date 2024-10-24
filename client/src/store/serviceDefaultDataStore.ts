import { create } from "zustand";
import { TserviceDataKey } from "@data/serviceData";

type TserviceDefaultData = {
  serviceTitle: string;
  serviceDesc: string;
  device: Tdevice | "";
  service: TserviceDataKey | "";
};

declare interface IserviceDefaultDataStore {
  data: TserviceDefaultData;
  setData: (newData: TserviceDefaultData) => void;
}

export const serviceDefaultDataStore = create<IserviceDefaultDataStore>()(
  (set) => ({
    data: {
      serviceTitle: "",
      serviceDesc: "",
      device: "",
      service: "",
    },
    setData: (newData: TserviceDefaultData) => set({ data: newData }),
  })
);
