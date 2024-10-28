import { T2depth } from "./common";
import { I2depthText } from "./common";
import { Tdepth1Text } from "../depth1/common";
import { optionImage, optionText, optionVideo } from "../option/option";

/* 고객센터 */
export const noticeText: I2depthText = {
  depth2: { eng: "notice", kor: "공지사항" },
};
export const noticeOptions: T2depthOption[] = [optionImage, optionText];
export const defaultNotice: T2depth = {
  isDefault: false,
  isSelected: false,
  ...noticeText,
  options: noticeOptions,
};

export const faqText: I2depthText = { depth2: { eng: "FAQ", kor: "FAQ" } };
export const defaultFaq: T2depth = {
  isDefault: false,
  isSelected: false,
  ...faqText,
  structure: "",
};

export const personalInquiryText: I2depthText = {
  depth2: {
    eng: "1:1 Inquiry",
    kor: "1:1 문의",
  },
};
export const defaultPersonalInquiry: T2depth = {
  isDefault: false,
  isSelected: false,
  ...personalInquiryText,
  structure: "",
};

export const userGuideText: I2depthText = {
  depth2: { eng: "User Guide", kor: "사용자 가이드" },
};
export const userGuideOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultUserGuide: T2depth = {
  isDefault: false,
  isSelected: false,
  ...userGuideText,
  options: userGuideOptions,
};

export const termsAndConditionsOfUseText: I2depthText = {
  depth2: { eng: "Terms and Conditions of Use", kor: "이용약관" },
};
export const defaultTermsAndConditionsOfUse: T2depth = {
  isDefault: false,
  isSelected: false,
  ...termsAndConditionsOfUseText,
  structure: "",
};

export const customerService2depthKeyArr = [
  "notice",
  "faq",
  "personalInquiry",
  "userGuide",
  "termsAndConditionsOfUse",
] as const;

export type TcustomerService2depthKey =
  (typeof customerService2depthKeyArr)[number];

export type TcustomerService2depth = {
  selectableDepth2: { [K in TcustomerService2depthKey]: T2depth };
};

interface IcustomerService2depth extends TcustomerService2depth, Tdepth1Text {}

export const defaultCustomerService2depth: IcustomerService2depth = {
  depth1: { eng: "customer service", kor: "고객센터" },
  selectableDepth2: {
    notice: defaultNotice,
    faq: defaultFaq,
    personalInquiry: defaultPersonalInquiry,
    userGuide: defaultUserGuide,
    termsAndConditionsOfUse: defaultTermsAndConditionsOfUse,
  },
};

export const customerService2depth = (
  service: Tservice
): IcustomerService2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaultCustomerService2depth,
        selectableDepth2: {
          ...defaultCustomerService2depth.selectableDepth2,
          notice: {
            ...defaultCustomerService2depth.selectableDepth2.notice,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    case "intermediaryMatch": {
      const update = {
        ...defaultCustomerService2depth,
        selectableDepth2: {
          ...defaultCustomerService2depth.selectableDepth2,
          faq: {
            ...defaultCustomerService2depth.selectableDepth2.faq,
            isDefault: true,
            isSelected: true,
          },
          userGuide: {
            ...defaultCustomerService2depth.selectableDepth2.userGuide,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    default:
      return defaultCustomerService2depth;
  }
};
