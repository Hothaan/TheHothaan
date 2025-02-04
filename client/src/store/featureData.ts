import { create } from "zustand";
import { IfetchedfeatureResponseData } from "@components/template/types";

interface IfeatureDataStore {
  featureData: IfetchedfeatureResponseData[] | null;
  setFeatureData: (featureData: IfetchedfeatureResponseData[] | null) => void;
}

export const featureData = create<IfeatureDataStore>((set) => ({
  featureData: null,
  setFeatureData: (featureData) => set({ featureData: featureData }),
}));
