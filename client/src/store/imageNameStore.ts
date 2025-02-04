import { create } from "zustand";

interface IimageNameStore {
  imageName: string[];
  setImageName: (newData: string[]) => void;
}

export const imageNameStore = create<IimageNameStore>((set) => ({
  imageName: [],
  setImageName: (newData) => set({ imageName: newData }),
}));
