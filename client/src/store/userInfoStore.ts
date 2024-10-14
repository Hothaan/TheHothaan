import { create } from "zustand";

/* 추후 userInfo 구조 정의하여 추가 */
interface IuserInfoStore {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  removeUserInfo: () => void;
}

export const useUserInfoStore = create<IuserInfoStore>()((set) => ({
  userInfo: 0,
  setUserInfo: (newUserInfo: any) => set({ userInfo: newUserInfo }),
  removeUserInfo: () => set({ userInfo: null }),
}));
