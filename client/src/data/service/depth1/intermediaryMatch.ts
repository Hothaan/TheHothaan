import { Tall2depth } from "../depth2/types";
import { main2depth } from "../depth2/main";
import { defaultService2depth } from "../depth2/service";
import { customerService2depth } from "../depth2/customerService";
import { myPage2depth } from "../depth2/mypage";
import { defaultUtility2depth } from "../depth2/utility";

export const intermediaryMatch1depthKeyArr = [
  "main",
  "service",
  "customerService",
  "myPage",
  "utility",
] as const;

export type TintermediaryMatch1depthKey =
  (typeof intermediaryMatch1depthKeyArr)[number];

export type TintermediaryMatch1depth = {
  [K in TintermediaryMatch1depthKey]: Tall2depth;
};

export const intermediaryMatch1depth: TintermediaryMatch1depth = {
  main: main2depth,
  service: defaultService2depth,
  customerService: customerService2depth("intermediaryMatch"),
  myPage: myPage2depth("intermediaryMatch"),
  utility: defaultUtility2depth,
};
