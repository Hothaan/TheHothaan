import { Tall2depth } from "../depth2/types";
import { main2depth } from "../depth2/main";
import { board2depth } from "../depth2/board";
import { myPage2depth } from "../depth2/mypage";
import { defaultUtility2depth } from "../depth2/utility";

export const communitySns1depthKeyArr = [
  "main",
  "board",
  "myPage",
  "utility",
] as const;

export type TcommunitySns1depthKey = (typeof communitySns1depthKeyArr)[number];

export type TcommunitySns1depth = {
  [K in TcommunitySns1depthKey]: Tall2depth;
};

export const communitySns1depth: TcommunitySns1depth = {
  main: main2depth,
  board: board2depth("communitySns"),
  myPage: myPage2depth("communitySns"),
  utility: defaultUtility2depth,
};
