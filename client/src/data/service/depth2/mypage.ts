import { T2depth } from "./types";
import { I2depthText } from "./types";

/* 마이페이지 */
export const profileText: I2depthText = { eng: "profile", kor: "내 프로필" };
export const defaultProfile: T2depth = {
  isDefault: false,
  isSelected: false,
  ...profileText,
  structure: "",
};

export const orderListText: I2depthText = {
  eng: "order list",
  kor: "주문 목록",
};
export const defaultOrderList: T2depth = {
  isDefault: false,
  isSelected: false,
  ...orderListText,
  structure: "",
};

export const cartText: I2depthText = { eng: "cart", kor: "장바구니" };
export const defaultCart: T2depth = {
  isDefault: false,
  isSelected: false,
  ...cartText,
  structure: "",
};

export const membershipWithdrawalText: I2depthText = {
  eng: "membership withdrawal",
  kor: "회원 탈퇴",
};
export const defaultMembershipWithdrawal: T2depth = {
  isDefault: false,
  isSelected: false,
  ...membershipWithdrawalText,
  structure: "",
};

export const couponText: I2depthText = { eng: "coupon", kor: "쿠폰" };
export const couponOptions: T2depthOption[] = [
  {
    eng: "coupon download",
    kor: "쿠폰 다운로드",
    structure: "",
    isSelected: false,
  },
  {
    eng: "coupon register",
    kor: "쿠폰 등록",
    structure: "",
    isSelected: false,
  },
];
export const defaultCoupon: T2depth = {
  isDefault: false,
  isSelected: false,
  ...couponText,
  options: couponOptions,
};

export const mileageText: I2depthText = { eng: "mileage", kor: "마일리지" };
export const defaultMileage: T2depth = {
  isDefault: false,
  isSelected: false,
  ...mileageText,
  structure: "",
};

export const myPage2depthKeyArr = [
  "profile",
  "orderList",
  "cart",
  "membershipWithdrawal",
  "coupon",
  "mileage",
] as const;

export type TmyPage2depthKey = (typeof myPage2depthKeyArr)[number];

export type TmyPage2depth = {
  [K in TmyPage2depthKey]: T2depth;
};

export const defaulTmyPage2depth: TmyPage2depth = {
  profile: defaultProfile,
  orderList: defaultOrderList,
  cart: defaultCart,
  membershipWithdrawal: defaultMembershipWithdrawal,
  coupon: defaultCoupon,
  mileage: defaultMileage,
};

export const myPage2depth = (service: Tservice): TmyPage2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaulTmyPage2depth,
        orderList: {
          ...defaulTmyPage2depth.orderList,
          isDefault: true,
          isSelected: true,
        },
        cart: {
          ...defaulTmyPage2depth.cart,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }
    case "communitySns": {
      const update = {
        ...defaulTmyPage2depth,
        profile: {
          ...defaulTmyPage2depth.profile,
          isDefault: true,
          isSelected: true,
        },
        orderList: {
          ...defaulTmyPage2depth.orderList,
          isDefault: true,
          isSelected: true,
        },
        cart: {
          ...defaulTmyPage2depth.cart,
          isDefault: true,
          isSelected: true,
        },
        membershipWithdrawal: {
          ...defaulTmyPage2depth.membershipWithdrawal,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }
    case "intermediaryMatch": {
      const update = {
        ...defaulTmyPage2depth,
        profile: {
          ...defaulTmyPage2depth.profile,
          isDefault: true,
          isSelected: true,
        },
        membershipWithdrawal: {
          ...defaulTmyPage2depth.membershipWithdrawal,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }
    default:
      return defaulTmyPage2depth;
  }
};
