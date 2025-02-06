import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IimageNameStore {
  imageName: string[];
  setImageName: (newData: string[]) => void;
}

export const imageNameStore = create<IimageNameStore>()(
  persist(
    (set) => ({
      imageName: [],
      setImageName: (newData) => set({ imageName: newData }),
    }),
    { name: "imageName" }
  )
);
