import { T2depth } from "./common";
import { I2depthText } from "./common";
import { Tdepth1Text } from "../depth1/common";
import { optionImage, optionText, optionVideo } from "../option/option";

/* 회사 소개 */
export const greetingText: I2depthText = { eng: "greetings", kor: "인사말" };
export const defaultGreeting: T2depth = {
  isDefault: false,
  isSelected: false,
  ...greetingText,
  structure: "",
};

export const companyInfoText: I2depthText = {
  eng: "company info",
  kor: "회사소개",
};
export const defaultCompanyInfo: T2depth = {
  isDefault: false,
  isSelected: false,
  ...companyInfoText,
  structure: "",
};

export const historyText: I2depthText = { eng: "history", kor: "연혁" };
export const defaultHistory: T2depth = {
  isDefault: false,
  isSelected: false,
  ...historyText,
  structure: "",
};

export const inquiryText: I2depthText = { eng: "inquiry", kor: "문의" };
export const defaultInquiry: T2depth = {
  isDefault: false,
  isSelected: false,
  ...inquiryText,
  structure: "",
};

export const recruitText: I2depthText = { eng: "recruit", kor: "채용" };
export const defaultRecruit: T2depth = {
  isDefault: false,
  isSelected: false,
  ...recruitText,
  structure: "",
};

export const directionText: I2depthText = {
  eng: "direction",
  kor: "오시는 길",
};
export const defaultDirection: T2depth = {
  isDefault: false,
  isSelected: false,
  ...directionText,
  structure: "",
};

export const companyNewsText: I2depthText = { eng: "news", kor: "뉴스" };
export const companyNewsOptions: T2depthOption[] = [
  optionImage,
  optionText,
  optionVideo,
];
export const defaultCompanyNews: T2depth = {
  isDefault: false,
  isSelected: false,
  ...companyNewsText,
  options: companyNewsOptions,
};

export const cibiText: I2depthText = { eng: "CI/BI", kor: "CI/BI" };
export const defaultCibi: T2depth = {
  isDefault: false,
  isSelected: false,
  ...cibiText,
  structure: "",
};

export const companyIntro2depthKeyArr = [
  "greeting",
  "companyInfo",
  "history",
  "inquiry",
  "recruit",
  "direction",
  "news",
  "ciBi",
] as const;

export type TcompanyIntro2depthKey = (typeof companyIntro2depthKeyArr)[number];

export type TcompanyIntro2depth = {
  [K in TcompanyIntro2depthKey]: T2depth;
};

export interface IcompanyIntro2depth extends TcompanyIntro2depth, Tdepth1Text {}

export const defaultCompanyIntro2depth: IcompanyIntro2depth = {
  depth1: { eng: "company intro", kor: "회사 소개" },
  greeting: defaultGreeting,
  companyInfo: defaultCompanyInfo,
  history: defaultHistory,
  inquiry: defaultInquiry,
  recruit: defaultRecruit,
  direction: defaultDirection,
  news: defaultCompanyNews,
  ciBi: defaultCibi,
};

export const companyIntro2depth = (service: Tservice): IcompanyIntro2depth => {
  switch (service) {
    case "homepageBoard": {
      const update = {
        ...defaultCompanyIntro2depth,
        greeting: {
          ...defaultCompanyIntro2depth.greeting,
          isDefault: true,
          isSelected: true,
        },
        companyInfo: {
          ...defaultCompanyIntro2depth.companyInfo,
          isDefault: true,
          isSelected: true,
        },
        history: {
          ...defaultCompanyIntro2depth.history,
          isDefault: true,
          isSelected: true,
        },
        recruit: {
          ...defaultCompanyIntro2depth.recruit,
          isDefault: true,
          isSelected: true,
        },
        news: {
          ...defaultCompanyIntro2depth.news,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }
    case "landingIntroduce": {
      const update = {
        ...defaultCompanyIntro2depth,
        greeting: {
          ...defaultCompanyIntro2depth.greeting,
          isDefault: true,
          isSelected: true,
        },
        inquiry: {
          ...defaultCompanyIntro2depth.inquiry,
          isDefault: true,
          isSelected: true,
        },
        direction: {
          ...defaultCompanyIntro2depth.direction,
          isDefault: true,
          isSelected: true,
        },
        news: {
          ...defaultCompanyIntro2depth.news,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }
    default:
      return defaultCompanyIntro2depth;
  }
};
