import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TserviceTypeMenu } from "@api/service/serviceTypeMenu";

interface IprojectDataStore {
  projectData: TserviceTypeMenu | null;
  setProjectData: (newData: TserviceTypeMenu | null) => void;
}

export const projectDataStore = create<IprojectDataStore>()(
  persist(
    (set) => ({
      projectData: null,
      setProjectData: (newData) => set({ projectData: newData }),
    }),
    { name: "projectData" }
  )
);
// window.addEventListener("beforeunload", () => {
//   localStorage.removeItem("projectData");
// });
