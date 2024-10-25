import { T2depth } from "./types";
import { I2depthText } from "./types";

/* 서비스 */
export const feeForUseText: I2depthText = {
  eng: "fee for use",
  kor: "요금안내",
};
export const defaultFeeForUse: T2depth = {
  isDefault: true,
  isSelected: true,
  ...feeForUseText,
  structure: "",
};

export const serviceListText: I2depthText = {
  eng: "service list",
  kor: "서비스 목록",
};
export const defaultServiceList: T2depth = {
  isDefault: false,
  isSelected: false,
  ...serviceListText,
  structure: "",
};

export const serviceDetailText: I2depthText = {
  eng: "service detail",
  kor: "서비스 상세",
};
export const defaultServiceDetail: T2depth = {
  isDefault: false,
  isSelected: false,
  ...serviceDetailText,
  structure: "",
};

export const serviceReviewText: I2depthText = { eng: "review", kor: "리뷰" };
export const defaultServiceReview: T2depth = {
  isDefault: false,
  isSelected: false,
  ...serviceReviewText,
  structure: "",
};

export const serviceIntroduceText: I2depthText = {
  eng: "service introduce",
  kor: "서비스 소개",
};
export const serviceIntroduceOptions: T2depthOption[] = [
  { eng: "one page", kor: "원페이지형", structure: "", isSelected: false },
  { eng: "text list", kor: "목록형(텍스트)", structure: "", isSelected: false },
  {
    eng: "image list",
    kor: "목록형(이미지)",
    structure: "",
    isSelected: false,
  },
];
export const defaultServiceIntroduce: T2depth = {
  isDefault: true,
  isSelected: true,
  ...serviceIntroduceText,
  options: serviceIntroduceOptions,
};

export const estimateInquiryText: I2depthText = {
  eng: "estimate inquiry",
  kor: "견적문의",
};
export const defaultEstimateInquiry: T2depth = {
  isDefault: true,
  isSelected: true,
  ...estimateInquiryText,
  structure: "",
};

export const serviceInquiryText: I2depthText = {
  eng: "service inquiry",
  kor: "서비스 문의",
};
export const defaultServiceInquiry: T2depth = {
  isDefault: true,
  isSelected: true,
  ...serviceInquiryText,
  structure: "",
};

export const service2depthKeyArr = [
  "feeForUse",
  "serviceList",
  "serviceDetail",
  "review",
  "serviceIntroduce",
  "estimateInquiry",
  "serviceInquiry",
] as const;

export type Tservice2depthKey = (typeof service2depthKeyArr)[number];

export type Tservice2depth = {
  [K in Tservice2depthKey]: T2depth;
};

export const defaultService2depth: Tservice2depth = {
  feeForUse: defaultFeeForUse,
  serviceList: defaultServiceList,
  serviceDetail: defaultServiceDetail,
  review: defaultServiceReview,
  serviceIntroduce: defaultServiceIntroduce,
  estimateInquiry: defaultEstimateInquiry,
  serviceInquiry: defaultServiceInquiry,
};
