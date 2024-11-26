import { create } from "zustand";

/* 추후 userInfo 구조 정의하여 추가 */

declare interface IuserInfoStore {
  isLogin: boolean;
  userInfo: TuserInfo;
  setUserInfo: (userInfo: TuserInfo) => void;
  removeUserInfo: () => void;
}

export const useUserInfoStore = create<IuserInfoStore>()((set) => ({
  isLogin: true,
  userInfo: { name: "홍길동", plan: "free", term: "월간" },
  setUserInfo: (newUserInfo: any) => set({ userInfo: newUserInfo }),
  removeUserInfo: () =>
    set({ isLogin: false, userInfo: { name: null, plan: null, term: null } }),
}));
