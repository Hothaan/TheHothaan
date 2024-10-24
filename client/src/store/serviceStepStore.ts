import { create } from "zustand";

export type TserviceStep = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
};

declare interface IserviceStepStore {
  steps: TserviceStep;
  setSteps: (steps: TserviceStep) => void;
}

export const serviceStepStore = create<IserviceStepStore>()((set) => ({
  steps: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  },
  setSteps: (steps: TserviceStep) => set({ steps: steps }),
}));
