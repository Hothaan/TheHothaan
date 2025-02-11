import { CSSObject } from "@emotion/react";

export type TtemplateType = string;

export interface ItemplateCss {
  [key: string]: CSSObject;
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
  style?: { [key: string]: { [key: string]: string } } | null;
}
