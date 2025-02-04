import { create } from "zustand";

interface IimageUrlStore {
  imageUrl: string[];
  setImageUrl: (newData: string[]) => void;
}

export const imageUrlStore = create<IimageUrlStore>((set) => ({
  imageUrl: [],
  setImageUrl: (newData) => set({ imageUrl: newData }),
}));
