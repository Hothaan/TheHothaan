import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TimageData = {
  imageName: string;
  imageUrl: string;
  isSuccess: boolean;
  feature: string;
};

interface IimageDataStore {
  imageData: TimageData[];
  setImageData: (newData: TimageData[]) => void;
}

export const imageDataStore = create<IimageDataStore>()(
  persist(
    (set) => ({
      imageData: [],
      setImageData: (newData) => set({ imageData: newData }),
    }),
    { name: "imageData" }
  )
);
