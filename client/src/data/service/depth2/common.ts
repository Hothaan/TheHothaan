import { Tmain2depth, Tmain2depthKey } from "./main";
import { TmyPage2depth, TmyPage2depthKey } from "./mypage";
import { Tutility2depth, Tutility2depthKey } from "./utility";
import { Tproduct2depth, Tproduct2depthKey } from "./product";
import {
  TcustomerService2depth,
  TcustomerService2depthKey,
} from "./customerService";
import { Tboard2depth, Tboard2depthKey } from "./board";
import { Tservice2depth, Tservice2depthKey } from "./service";
import { TcompanyIntro2depth, TcompanyIntro2depthKey } from "./companyIntro";
import { Tdepth1Text } from "../depth1/common";

export interface I2depthText {
  depth2: {
    eng: string;
    kor: string;
  };
}

export interface T2depth extends I2depthText {
  isDefault: boolean;
  isSelected: boolean;
  structure?: string;
  options?: T2depthOption[];
}

export type ServiceTypeWithDepth2 = {
  selectableDepth2: { [key: string]: T2depth };
};

export type Tall2depth = Tdepth1Text & {
  selectableDepth2: { [key: string]: T2depth };
};

/* all 2depth */

// export type Tall2depth =
//   | Tmain2depth
//   | TmyPage2depth
//   | Tutility2depth
//   | Tproduct2depth
//   | TcustomerService2depth
//   | Tboard2depth
//   | Tservice2depth
//   | TcompanyIntro2depth;

export type Tall2depthKeys =
  | Tmain2depthKey
  | TmyPage2depthKey
  | Tutility2depthKey
  | Tproduct2depthKey
  | TcustomerService2depthKey
  | Tboard2depthKey
  | Tservice2depthKey
  | TcompanyIntro2depthKey;
