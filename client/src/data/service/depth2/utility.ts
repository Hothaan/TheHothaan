import { T2depth } from "./common";
import { I2depthText } from "./common";
import { Tdepth1Text } from "../depth1/common";

export const loginText: I2depthText = { eng: "login", kor: "로그인" };
export const loginOptions: T2depthOption[] = [
  { eng: "social login", kor: "소셜 로그인", structure: "", isSelected: false },
];
export const defaultLogin: T2depth = {
  isDefault: true,
  isSelected: true,
  ...loginText,
  options: loginOptions,
};

export const joinText: I2depthText = { eng: "join", kor: "회원가입" };
export const defaultJoin: T2depth = {
  isDefault: true,
  isSelected: true,
  ...joinText,
  structure: "",
};

export const findIdText: I2depthText = { eng: "find id", kor: "아이디 찾기" };
export const defaultFindId: T2depth = {
  isDefault: true,
  isSelected: true,
  ...findIdText,
  structure: "",
};

export const findPwText: I2depthText = { eng: "find pw", kor: "비밀번호 찾기" };
export const defaultFindPw: T2depth = {
  isDefault: true,
  isSelected: true,
  ...findPwText,
  structure: "",
};

export const searchText: I2depthText = { eng: "search", kor: "검색" };
export const searchOptions: T2depthOption[] = [
  { eng: "normal search", kor: "일반 검색", structure: "", isSelected: false },
  {
    eng: "integration search",
    kor: "통합 검색",
    structure: "",
    isSelected: false,
  },
];
export const defaultSearch: T2depth = {
  isDefault: false,
  isSelected: false,
  ...searchText,
  options: searchOptions,
};

export const alarmText: I2depthText = { eng: "alarm", kor: "알림" };
export const defaultAlarm: T2depth = {
  isDefault: false,
  isSelected: false,
  ...alarmText,
  structure: "",
};

export const utility2depthKeyArr = [
  "login",
  "join",
  "findId",
  "findPw",
  "search",
  "alarm",
] as const;

export type Tutility2depthKey = (typeof utility2depthKeyArr)[number];

export type Tutility2depth = {
  [K in Tutility2depthKey]: T2depth;
};

interface Iutility2depth extends Tutility2depth, Tdepth1Text {}

export const defaultUtility2depth: Iutility2depth = {
  depth1: { eng: "utility", kor: "유틸리티" },
  login: defaultLogin,
  join: defaultJoin,
  findId: defaultFindId,
  findPw: defaultFindPw,
  search: defaultSearch,
  alarm: defaultAlarm,
};
