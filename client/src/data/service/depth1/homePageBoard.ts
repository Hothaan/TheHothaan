import { Tall2depth } from "../depth2/types";
import { main2depth } from "../depth2/main";
import { companyIntro2depth } from "../depth2/companyIntro";
import { product2depth } from "../depth2/product";
import { board2depth } from "../depth2/board";

export const homePageBoard1depthKeyArr = [
  "main",
  "companyIntro",
  "product",
  "board",
] as const;

export type ThomePageBoard1depthKey =
  (typeof homePageBoard1depthKeyArr)[number];

export type ThomePageBoard1depth = {
  [K in ThomePageBoard1depthKey]: Tall2depth;
};

export const homepageBoard1depth: ThomePageBoard1depth = {
  main: main2depth,
  companyIntro: companyIntro2depth("homepageBoard"),
  product: product2depth("homepageBoard"),
  board: board2depth("homepageBoard"),
};
