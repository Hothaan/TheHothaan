import { create } from "zustand";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/serviceData";

declare interface IapiRequestStore {
  apiRequestData: IapiRequest<TserviceDataKey>;
  setApiRequestData: (newData: IapiRequest<TserviceDataKey>) => void;
}

export const apiRequestStore = create<IapiRequestStore>()((set) => ({
  apiRequestData: {
    service: "shoppingMall",
    serviceTitle: "",
    serviceDesc: "",
    depth1: "main",
    depth2: "main",
    structure: "",
  },
  setApiRequestData: (newData: IapiRequest<TserviceDataKey>) =>
    set({ apiRequestData: newData }),
}));
