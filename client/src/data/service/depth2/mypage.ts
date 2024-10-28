import { Tdepth1Text } from "../depth1/common";
import { T2depth } from "./common";
import { I2depthText } from "./common";

/* 마이페이지 */
export const profileText: I2depthText = {
  depth2: { eng: "profile", kor: "내 프로필" },
};
export const defaultProfile: T2depth = {
  isDefault: false,
  isSelected: false,
  ...profileText,
  structure: "",
};

export const orderListText: I2depthText = {
  depth2: { eng: "order list", kor: "주문 목록" },
};
export const defaultOrderList: T2depth = {
  isDefault: false,
  isSelected: false,
  ...orderListText,
  structure: "",
};

export const cartText: I2depthText = {
  depth2: { eng: "cart", kor: "장바구니" },
};
export const defaultCart: T2depth = {
  isDefault: false,
  isSelected: false,
  ...cartText,
  structure: "",
};

export const membershipWithdrawalText: I2depthText = {
  depth2: { eng: "membership withdrawal", kor: "회원 탈퇴" },
};
export const defaultMembershipWithdrawal: T2depth = {
  isDefault: false,
  isSelected: false,
  ...membershipWithdrawalText,
  structure: "",
};

export const couponText: I2depthText = {
  depth2: { eng: "coupon", kor: "쿠폰" },
};
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

export const mileageText: I2depthText = {
  depth2: { eng: "mileage", kor: "마일리지" },
};
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
  selectableDepth2: { [K in TmyPage2depthKey]: T2depth };
};

interface ImyPage2depth extends TmyPage2depth, Tdepth1Text {}

export const defaulTmyPage2depth: ImyPage2depth = {
  depth1: { eng: "my page", kor: "마이페이지" },
  selectableDepth2: {
    profile: defaultProfile,
    orderList: defaultOrderList,
    cart: defaultCart,
    membershipWithdrawal: defaultMembershipWithdrawal,
    coupon: defaultCoupon,
    mileage: defaultMileage,
  },
};

export const myPage2depth = (service: Tservice): TmyPage2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaulTmyPage2depth,
        selectableDepth2: {
          ...defaulTmyPage2depth.selectableDepth2,
          orderList: {
            ...defaulTmyPage2depth.selectableDepth2.orderList,
            isDefault: true,
            isSelected: true,
          },
          cart: {
            ...defaulTmyPage2depth.selectableDepth2.cart,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    case "communitySns": {
      const update = {
        ...defaulTmyPage2depth,
        selectableDepth2: {
          ...defaulTmyPage2depth.selectableDepth2,
          profile: {
            ...defaulTmyPage2depth.selectableDepth2.profile,
            isDefault: true,
            isSelected: true,
          },
          orderList: {
            ...defaulTmyPage2depth.selectableDepth2.orderList,
            isDefault: true,
            isSelected: true,
          },
          cart: {
            ...defaulTmyPage2depth.selectableDepth2.cart,
            isDefault: true,
            isSelected: true,
          },
          membershipWithdrawal: {
            ...defaulTmyPage2depth.selectableDepth2.membershipWithdrawal,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    case "intermediaryMatch": {
      const update = {
        ...defaulTmyPage2depth,
        selectableDepth2: {
          ...defaulTmyPage2depth.selectableDepth2,
          profile: {
            ...defaulTmyPage2depth.selectableDepth2.profile,
            isDefault: true,
            isSelected: true,
          },
          membershipWithdrawal: {
            ...defaulTmyPage2depth.selectableDepth2.membershipWithdrawal,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    default:
      return defaulTmyPage2depth;
  }
};
