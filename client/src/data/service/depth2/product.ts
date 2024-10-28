import { T2depth } from "./common";
import { I2depthText } from "./common";
import { Tdepth1Text } from "../depth1/common";

/* 상품 */
export const productListText: I2depthText = {
  eng: "product list",
  kor: "상품 목록",
};
export const defaultProductList: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productListText,
  structure: "",
};

export const productDetailText: I2depthText = {
  eng: "product detail",
  kor: "상품 상세",
};
export const defaultProductDetail: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productDetailText,
  structure: "",
};

export const productReviewText: I2depthText = { eng: "review", kor: "리뷰" };
export const defaultReview: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productReviewText,
  structure: "",
};

export const productIntroductionText: I2depthText = {
  eng: "product introduction",
  kor: "상품 소개",
};
export const defaultProductIntroduction: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productIntroductionText,
  structure: "",
};

export const product2depthKeyArr = [
  "productList",
  "productDetail",
  "review",
  "productIntroduction",
] as const;

export type Tproduct2depthKey = (typeof product2depthKeyArr)[number];

export type Tproduct2depth = {
  [K in Tproduct2depthKey]: T2depth;
};

interface Iproduct2depth extends Tproduct2depth, Tdepth1Text {}

export const defaultProduct2depth: Iproduct2depth = {
  depth1: { eng: "product", kor: "상품" },
  productList: defaultProductList,
  productDetail: defaultProductDetail,
  review: defaultReview,
  productIntroduction: defaultProductIntroduction,
};

export const product2depth = (service: Tservice): Iproduct2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaultProduct2depth,
        productList: {
          ...defaultProduct2depth.productList,
          isDefault: true,
          isSelected: true,
        },
        productDetail: {
          ...defaultProduct2depth.productDetail,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }

    case "homepageBoard": {
      const update = {
        ...defaultProduct2depth,
        productIntroduction: {
          ...defaultProduct2depth.productIntroduction,
          isDefault: true,
          isSelected: true,
        },
      };
      return update;
    }
    default:
      return defaultProduct2depth;
  }
};
