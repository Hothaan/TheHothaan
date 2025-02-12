import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IimageUrlStore {
  imageUrl: string[];
  setImageUrl: (newData: string[]) => void;
}

export const imageUrlStore = create<IimageUrlStore>()(
  persist(
    (set) => ({
      imageUrl: [],
      setImageUrl: (newData) => set({ imageUrl: newData }),
    }),
    { name: "imageUrl" }
  )
);
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("imageUrl");
// });
