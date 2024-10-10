/* client 단 관련 글로벌 타입 */

declare type Tcharacter = "common" | "shoppingMall"; //쇼핑몰
// | "communitySns" //커뮤니티&SNS
// | "dashboardStats" //통계&대시보드
// | "intermediaryMatch" //중개&매칭
// | "homepageBoard" //홈페이지&게시판
// | "landingIntroduce"; //랜딩&소개

declare type Tunit = "page" | "component";

declare type TcommonComponent =
  | "login"
  | "search"
  | "FAQ"
  | "header"
  | "footer"
  | "banner"
  | "slider"
  | "card";

declare type TshoppingMallComponent =
  | "review"
  | "payment"
  | "cart"
  | "orderManagement";

// declare type TcommunitySnsComponent = "follow" | "alarm" | "reply" | "chatting";

// declare type TdashboardStatsComponent = "chart" | "table";

// declare type TintermediaryMatchComponent = "matching" | "recruitment";

// declare type ThomepageBoardComponent = "notice" | "qna" | "event";

// declare type TlandingIntroduceComponent = "about" | "history";

declare interface TcomponentRole {
  common: TcommonComponent;
  shoppingMall: TshoppingMallComponent;
  // communitySns: TcommunitySnsComponent;
  // dashboardStats: TdashboardStatsComponent;
  // intermediaryMatch: TintermediaryMatchComponent;
  // homepageBoard: ThomepageBoardComponent;
  // landingIntroduce: TlandingIntroduceComponent;
}

declare interface IcomponentData {
  character: Tcharacter;
  role: TcomponentRole[Tcharacter];
}

declare interface IcomponentStructure {
  common: Record<TcommonComponent, string[]>;
  shoppingMall: Record<TshoppingMallComponent, string[]>;
}
