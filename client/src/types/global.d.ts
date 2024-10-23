/* client 단 관련 글로벌 타입 */

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

declare type Tplan = "free" | "basic" | "pro";

declare type TuserInfo = {
  name: string | null;
  plan: Tplan | null;
  term: string | null;
};

declare interface ItextField {
  label: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

declare interface ItextArea {
  label: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

declare interface IradioButton {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  required?: boolean;
}

declare interface IradioButtonAccordion {
  radioButton: IradioButton;
  options: Icheckbox[];
}

declare interface Icheckbox {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

declare type TbtnSize = "XL" | "M" | "S";

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

declare interface IserviceModal {
  isOpen: boolean;
  title: string;
  buttons: Ibutton[];
  onClick: () => void;
  children?: React.ReactNode;
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

declare interface IbuttonDepth1 {
  depth1: string;
  deleteFunction: () => void;
}

declare interface IbuttonChooseDepth2Function {
  info: string;
  depth1: string;
  depth2: string;
  options: string[];
  onChoose: () => void;
  deleteFunction: (depth2: string) => void;
}

declare interface IselectableDepth2 {
  isSelected: boolean;
  depth2: string;
  options: string[];
}

declare interface IbuttonAddDepth1 {
  service: Tservice; //선택한 서비스 성격
  selectableDepth1: IbuttonDepth1[]; //해당 상위 메뉴에서 선택 가능한 하위 메뉴 경우의 수와 선택 값
  // onAdd: (updateDepth1: IbuttonChooseDepth1[]) => void; //체크
  // onCancel: () => void; //체크박스 수정사항을 저장하지 않고 원래 값으로 돌린 뒤 모달 닫음
}

declare interface IbuttonAddDepth2 {
  depth1: string; //상위 메뉴 정보를 받아와서 선택 가능한 메뉴 경우의수 받아옴
  selectableDepth2: IselectableDepth2[]; //해당 상위 메뉴에서 선택 가능한 하위 메뉴 경우의 수와 선택 값
  onAdd: (updateDepth2: IselectableDepth2[]) => void; //체크박스 선택 후 저장시 모달을 닫고 새로 선택된 하위메뉴의 buttonChooseDepth2를 생성
  onCancel: () => void; //체크박스 수정사항을 저장하지 않고 원래 값으로 돌린 뒤 모달 닫음
}

declare interface IbuttonClose {
  top: string;
  right: string;
  color?: "gray" | "blue";
  deleteFunction?: () => void;
  onClick?: () => void;
}

declare type Tdevice = "pc" | "tablet" | "mobile";

declare interface IbuttonChooseDevice {
  isSelected: boolean;
  device: Tdevice;
}

declare interface IbuttonChooseService {
  isSelected: boolean;
  service: Tservice;
}
