// export type TtemplateType = "capture" | "render";

export type TtemplateType = string;

// export interface ItemplateType {
//   templateType: TtemplateType;
// }

export interface ItemplateType {
  templateType: TtemplateType;
}

export interface IfetchedfeatureResponseData {
  feature_id: number;
  menu: string;
  feature: string;
  content: any;
}
