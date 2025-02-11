import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IprojectId {
  projectId: string | null;
  setProjectId: (newData: string | null) => void;
}

export const projectIdStore = create<IprojectId>()(
  persist(
    (set) => ({
      projectId: null,
      setProjectId: (newData) => set({ projectId: newData }),
    }),
    { name: "projectId" }
  )
);
