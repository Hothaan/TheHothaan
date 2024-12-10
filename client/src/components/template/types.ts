export type TtemplateType = string;

export interface ItemplateCss {
  [key: string]: Record<string, string>;
}

export interface ItemplateType {
  templateType: TtemplateType;
}

export interface IfetchedfeatureResponseData {
  feature_id: number;
  menu: string;
  feature: string;
  content: any;
  option?: string | null;
}
