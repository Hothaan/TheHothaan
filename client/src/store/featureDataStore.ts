import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IfetchedfeatureResponseData } from "@components/template/types";

interface IfeatureDataStore {
  featureData: IfetchedfeatureResponseData[] | null;
  setFeatureData: (featureData: IfetchedfeatureResponseData[] | null) => void;
}

export const featureDataStore = create<IfeatureDataStore>()(
  persist(
    (set) => ({
      featureData: null,
      setFeatureData: (featureData) => set({ featureData: featureData }),
    }),
    { name: "featureData" }
  )
);
