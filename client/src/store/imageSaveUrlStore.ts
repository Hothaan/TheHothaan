import { create } from "zustand";

interface IimageSaveUrlStore {
  imageSaveUrl: string[];
  setImageSaveUrl: (newData: string[]) => void;
}

export const ImageSaveUrlStore = create<IimageSaveUrlStore>((set) => ({
  imageSaveUrl: [],
  setImageSaveUrl: (newData) => set({ imageSaveUrl: newData }),
}));
