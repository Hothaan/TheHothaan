import { Tall2depth } from "../depth2/common";
import { main2depth } from "../depth2/main";
import { product2depth } from "../depth2/product";
import { customerService2depth } from "../depth2/customerService";
import { myPage2depth } from "../depth2/mypage";
import { defaultUtility2depth } from "../depth2/utility";

export const shoppingMall1depthKeyArr = [
  "main",
  "product",
  "customerService",
  "myPage",
  "utility",
] as const;

export type TshoppingMall1depthKey = (typeof shoppingMall1depthKeyArr)[number];

export type TshoppingMall1depth = {
  [K in TshoppingMall1depthKey]: Tall2depth;
};

export const shoppingMall1depth: TshoppingMall1depth = {
  main: main2depth,
  product: product2depth("shoppingMall"),
  customerService: customerService2depth("shoppingMall"),
  myPage: myPage2depth("shoppingMall"),
  utility: defaultUtility2depth,
};
