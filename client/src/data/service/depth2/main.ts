import { T2depth } from "./types";
// import { I2depthText } from "./common";

const main2depthKeyArr = ["main"] as const;
export type Tmain2depthKey = (typeof main2depthKeyArr)[number];

export type Tmain2depth = {
  [K in Tmain2depthKey]: T2depth;
};

export const main2depth: Tmain2depth = {
  main: {
    isDefault: true,
    isSelected: true,
    eng: "main",
    kor: "메인",
    structure: "",
  },
};
