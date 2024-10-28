import { T2depth } from "./common";
import { Tdepth1Text } from "../depth1/common";
import { I2depthText } from "./common";

export const mainText: I2depthText = {
  depth2: { eng: "main", kor: "메뉴" },
};

const mainDefault: T2depth = {
  isDefault: true,
  isSelected: true,
  ...mainText,
  structure: "",
};

const main2depthKeyArr = ["main"] as const;
export type Tmain2depthKey = (typeof main2depthKeyArr)[number];

export type Tmain2depth = {
  selectableDepth2: { [K in Tmain2depthKey]: T2depth };
};

interface Imain2depth extends Tmain2depth, Tdepth1Text {}

export const main2depth: Imain2depth = {
  depth1: { eng: "main", kor: "메인" },
  selectableDepth2: {
    main: mainDefault,
  },
};
