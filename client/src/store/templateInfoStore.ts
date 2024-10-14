import { create } from "zustand";

interface ItemplateInfoStore {
  templateInfo: { type: Tcharacter | null; desc: string | null };
  setTemplateInfo: (newTemplateInfo: {
    type: Tcharacter | null;
    desc: string | null;
  }) => void;
  removeTemplateInfo: () => void;
}

export const useTemplateInfoStore = create<ItemplateInfoStore>()((set) => ({
  templateInfo: { type: null, desc: null },
  setTemplateInfo: (newTemplateInfo: {
    type: Tcharacter | null;
    desc: string | null;
  }) => set((state) => ({ templateInfo: newTemplateInfo })),
  removeTemplateInfo: () =>
    set((state) => ({ templateInfo: { type: null, desc: null } })),
}));
