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

declare type Tplan = "free" | "basic" | "pro";

declare type TuserInfo = {
  name: string | null;
  plan: Tplan | null;
  term: string | null;
};

declare type TbtnSize = "XL" | "M";

declare type TbtnBg = "gradient" | "blue" | "gray" | "white";

declare interface Ibutton {
  size: TbtnSize;
  bg: Tbg;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

declare interface IbuttonIcon {
  size: TbtnSize;
  icon: ReactElement;
  text: string;
  onClick?: () => void;
}

declare type TbuttonIconAccordionOption = {
  text: string;
  onClick: () => void;
};

declare interface IbuttonIconAccordion {
  size: TbtnSize;
  icon: ReactElement;
  text: string;
  onClick: () => void;
  options: TbuttonIconAccordionOption[];
}

declare interface Imodal {
  isOpen: boolean;
  content: string;
  onClick: () => void;
  buttons: Ibutton[];
}

declare interface ItoastPopup {
  text: string;
  isToast: boolean;
  setIsToast: React.Dispatch<React.SetStateAction<boolean>>;
}

declare type TbuttonStepStatus = "active" | "disabled" | "complete";

declare interface IbuttonStep {
  status: TbuttonStepStatus;
  step: number;
  text: string;
  onClick: () => void;
}

declare interface IbuttonChooseDepth2 {
  depth2: string | null;
  options: string[];
  selectedOption: string | null;
  onChoose: () => void;
  onAdd: () => void;
  deleteFunction: () => void;
}

declare interface IbuttonClose {
  deleteFunction?: () => void;
}

declare type Tdevice = "pc" | "tablet" | "mobile";

declare interface IbuttonChooseDevice {
  isSelected: boolean;
  device: Tdevice;
}
