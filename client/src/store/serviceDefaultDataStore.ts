import { create } from "zustand";
import { TserviceDataKey } from "@data/service/serviceData";

type TserviceDefaultData = {
  serviceTitle: string;
  serviceDesc: string;
  device: Tdevice | "";
  service: TserviceDataKey | "";
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
      device: "",
      service: "",
    },
    setServiceDefaultData: (newData: TserviceDefaultData) =>
      set({ serviceDefaultData: newData }),
  })
);
