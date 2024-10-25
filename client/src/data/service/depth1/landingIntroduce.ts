import { Tall2depth } from "../depth2/types";
import { main2depth } from "../depth2/main";
import { companyIntro2depth } from "../depth2/companyIntro";
import { product2depth } from "../depth2/product";
import { board2depth } from "../depth2/board";

export const landingIntroduce1depthKeyArr = [
  "main",
  "companyIntro",
  "product",
  "board",
] as const;

export type TlandingIntroduce1depthKey =
  (typeof landingIntroduce1depthKeyArr)[number];

export type TlandingIntroduce1depth = {
  [K in TlandingIntroduce1depthKey]: Tall2depth;
};

export const landingIntroduce1depth: TlandingIntroduce1depth = {
  main: main2depth,
  companyIntro: companyIntro2depth("landingIntroduce"),
  product: product2depth("landingIntroduce"),
  board: board2depth("landingIntroduce"),
};
