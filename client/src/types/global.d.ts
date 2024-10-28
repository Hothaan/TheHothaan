/* client 단 관련 글로벌 타입 */

declare type T2depthOption = {
  eng: string;
  kor: string;
  structure: string;
  isSelected: boolean;
};

declare type Tservice =
  | "shoppingMall"
  | "communitySns"
  | "intermediaryMatch"
  | "homepageBoard"
  | "landingIntroduce";

declare type Tcharacter =
  | "common"
  | "shoppingMall" //쇼핑몰
  | "communitySns" //커뮤니티&SNS
  | "dashboardStats" //통계&대시보드
  | "intermediaryMatch" //중개&매칭
  | "homepageBoard" //홈페이지&게시판
  | "landingIntroduce"; //랜딩&소개

declare interface IStructure {
  [key: string]: string;
}

declare interface IStructureData {
  shoppingMall: IStructure;
  communitySns: IStructure;
  dashboardStats: IStructure;
  intermediaryMatch: IStructure;
  homepageBoard: IStructure;
  landingIntroduce: IStructure;
}

declare type Tplan = "free" | "basic" | "pro";

declare type TuserInfo = {
  name: string | null;
  plan: Tplan | null;
  term: string | null;
};

declare type Tdevice = "pc" | "tablet" | "mobile";
