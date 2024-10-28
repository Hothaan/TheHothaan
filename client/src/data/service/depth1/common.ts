import { TshoppingMall1depthKey } from "./shoppingMall";
import { TcommunitySns1depthKey } from "./communitySns";
import { TintermediaryMatch1depthKey } from "./intermediaryMatch";
import { ThomePageBoard1depthKey } from "./homePageBoard";
import { TlandingIntroduce1depthKey } from "./landingIntroduce";

export const depth1KeyArr = [
  "main",
  "product",
  "customerService",
  "myPage",
  "utility",
  "board",
  "companyIntro",
] as const;

export type Tdepth1KeyTextArr = (typeof depth1KeyArr)[number];

export type TallDepth1Keys =
  | TshoppingMall1depthKey
  | TcommunitySns1depthKey
  | TintermediaryMatch1depthKey
  | ThomePageBoard1depthKey
  | TlandingIntroduce1depthKey;

export type Tdepth1KeyText = {
  [K in Tdepth1KeyTextArr]: { eng: string; kor: string };
};

export type Tdepth1Text = {
  depth1: { eng: string; kor: string };
};

export const depth1KeyText: Tdepth1KeyText = {
  main: { eng: "main", kor: "메인" },
  product: { eng: "product", kor: "상품" },
  customerService: { eng: "customerService", kor: "고객센터" },
  myPage: { eng: "myPage", kor: "마이페이지" },
  utility: { eng: "utility", kor: "유틸리티" },
  board: { eng: "board", kor: "게시판" },
  companyIntro: { eng: "companyIntro", kor: "회사 소개" },
};
