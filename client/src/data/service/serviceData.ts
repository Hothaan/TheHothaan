import { shoppingMall1depth, TshoppingMall1depth } from "./depth1/shoppingMall";
import { communitySns1depth, TcommunitySns1depth } from "./depth1/communitySns";
import {
  intermediaryMatch1depth,
  TintermediaryMatch1depth,
} from "./depth1/intermediaryMatch";
import {
  homepageBoard1depth,
  ThomePageBoard1depth,
} from "./depth1/homePageBoard";
import {
  landingIntroduce1depth,
  TlandingIntroduce1depth,
} from "./depth1/landingIntroduce";

const serviceKeyArr = [
  "shoppingMall",
  "communitySns",
  "intermediaryMatch",
  "homepageBoard",
  "landingIntroduce",
] as const;

export type TserviceDataKey = (typeof serviceKeyArr)[number];

type ServiceTypeMapping = {
  shoppingMall: TshoppingMall1depth;
  communitySns: TcommunitySns1depth;
  intermediaryMatch: TintermediaryMatch1depth;
  homepageBoard: ThomePageBoard1depth;
  landingIntroduce: TlandingIntroduce1depth;
};

export type TserviceDataType<T extends TserviceDataKey> = ServiceTypeMapping[T];

export const serviceData: TserviceData = {
  shoppingMall: shoppingMall1depth,
  communitySns: communitySns1depth,
  intermediaryMatch: intermediaryMatch1depth,
  homepageBoard: homepageBoard1depth,
  landingIntroduce: landingIntroduce1depth,
};

export type TDepth1KeyForService<T extends TserviceDataKey> =
  keyof TserviceDataType<T>;

type TserviceData = {
  [T in TserviceDataKey]: TserviceDataType<T>;
};
