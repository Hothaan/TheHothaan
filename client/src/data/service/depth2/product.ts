import { T2depth } from "./common";
import { I2depthText } from "./common";
import { Tdepth1Text } from "../depth1/common";

/* 상품 */
export const productListText: I2depthText = {
  depth2: {
    eng: "product list",
    kor: "상품 목록",
  },
};
export const defaultProductList: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productListText,
  structure: "",
};

export const productDetailText: I2depthText = {
  depth2: { eng: "product detail", kor: "상품 상세" },
};
export const defaultProductDetail: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productDetailText,
  structure: "",
};

export const productReviewText: I2depthText = {
  depth2: { eng: "review", kor: "리뷰" },
};
export const defaultReview: T2depth = {
  isDefault: false,
  isSelected: false,
  ...productReviewText,
  structure: "",
};

export const productIntroductionText: I2depthText = {
  depth2: { eng: "product introduction", kor: "상품 소개" },
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
  selectableDepth2: { [K in Tproduct2depthKey]: T2depth };
};

// export type Tproduct2depth = {
//   selectableDepth2: Record<string, T2depth>;
// };

interface Iproduct2depth extends Tproduct2depth, Tdepth1Text {}

export const defaultProduct2depth: Iproduct2depth = {
  depth1: { eng: "product", kor: "상품" },
  selectableDepth2: {
    productList: defaultProductList,
    productDetail: defaultProductDetail,
    review: defaultReview,
    productIntroduction: defaultProductIntroduction,
  },
};

export const product2depth = (service: Tservice): Iproduct2depth => {
  switch (service) {
    case "shoppingMall": {
      const update = {
        ...defaultProduct2depth,
        selectableDepth2: {
          ...defaultProduct2depth.selectableDepth2,
          productList: {
            ...defaultProduct2depth.selectableDepth2.productList,
            isDefault: true,
            isSelected: true,
          },
          productDetail: {
            ...defaultProduct2depth.selectableDepth2.productDetail,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    case "homepageBoard": {
      const update = {
        ...defaultProduct2depth,
        selectableDepth2: {
          ...defaultProduct2depth.selectableDepth2,
          productIntroduction: {
            ...defaultProduct2depth.selectableDepth2.productIntroduction,
            isDefault: true,
            isSelected: true,
          },
        },
      };
      return update;
    }
    default:
      return defaultProduct2depth;
  }
};
