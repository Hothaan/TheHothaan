import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IserviceDatainterface } from "@pages/user/ServicePage/ServiceStep2Page";

interface IserviceData {
  serviceData: IserviceDatainterface | null;
  setServiceData: (newData: IserviceDatainterface | null) => void;
}

export const serviceDataStore = create<IserviceData>()(
  persist(
    (set) => ({
      serviceData: {
        device: {
          number: null,
          text: null,
        },
        serviceType: {
          number: null,
          text: null,
        },
      },
      setServiceData: (newData) => set({ serviceData: newData }),
    }),
    { name: "serviceData" }
  )
);
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("serviceData");
// });
