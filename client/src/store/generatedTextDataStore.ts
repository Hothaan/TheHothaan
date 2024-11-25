import { create } from "zustand";
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";

interface IgeneratedTextDataStore {
  generatedTextData: IgeneratedText[];
  setGeneratedTextData: (newData: IgeneratedText[]) => void;
}

export const generatedTextDataStore = create<IgeneratedTextDataStore>(
  (set) => ({
    generatedTextData: [],
    setGeneratedTextData: (newData) => set({ generatedTextData: newData }),
  })
);
