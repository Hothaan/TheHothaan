/* client 단 관련 글로벌 타입 */

declare type Tcharacter =
  | "common"
  | "shoppingMall" //쇼핑몰
  | "communitySns" //커뮤니티&SNS
  | "dashboardStats" //통계&대시보드
  | "intermediaryMatch" //중개&매칭
  | "homepageBoard" //홈페이지&게시판
  | "landingIntroduce"; //랜딩&소개

declare type TcommonRole =
  | "login"
  | "search"
  | "FAQ"
  | "header"
  | "footer"
  | "banner"
  | "slider"
  | "card";

declare type TshoppingMallRole =
  | "review"
  | "payment"
  | "cart"
  | "orderManagement";

declare type Trole = { common: TcommonRole; shoppingMall: TshoppingMallRole };

declare interface IcomponentData {
  title: string;
  character: Tcharacter;
  isCommon: boolean;
  role: TRole[Tcharacter];
  structure: string;
  desc: string;
}

declare interface IStructure {
  [key: string]: string;
}

declare interface IStructureData {
  common: IStructure;
  shoppingMall: IStructure;
  communitySns: IStructure;
  dashboardStats: IStructure;
  intermediaryMatch: IStructure;
  homepageBoard: IStructure;
  landingIntroduce: IStructure;
}

// declare interface Irequest {
//   title: string;
//   character: keyof typeof rolesData;
//   isCommon: boolean;
//   role: string;
//   structure: string;
//   desc: string;
// }
