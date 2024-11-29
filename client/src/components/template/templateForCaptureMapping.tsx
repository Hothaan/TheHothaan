import React from "react";
import ShoppingMallMain from "./templateStructureForCapture/shoppingMall/ShoppingMallMain";
import ShoppingMallProductList from "./templateStructureForCapture/shoppingMall/ShoppingMallProductList";
import ShoppingMallProductDetail from "./templateStructureForCapture/shoppingMall/ShoppingMallProductDetail";
import ShoppingMallCart from "./templateStructureForCapture/shoppingMall/ShoppingMallCart";
import ShoppingMallOrderList from "./templateStructureForCapture/shoppingMall/ShoppingMallOrderList";
import ShoppingMallFindId from "./templateStructureForCapture/shoppingMall/ShoppingMallFindId";
import ShoppingMallFindPw from "./templateStructureForCapture/shoppingMall/ShoppingMallFindPw";
import ShoppingMallJoin from "./templateStructureForCapture/shoppingMall/ShoppingMall.Join";
import ShoppingMallLogin from "./templateStructureForCapture/shoppingMall/ShoppingMallLogin";
import ShoppingMallNotice from "./templateStructureForCapture/shoppingMall/ShoppingMallNotice";
import ShoppingMallWidthDrawer from "./templateStructureForCapture/shoppingMall/ShoppingMallWidthDrawer";
import ShoppingMallBrandIntroduce from "./templateStructureForCapture/shoppingMall/ShoppingMallBrandIntroduce";
import { TtemplateType } from "./types";

export const templateMapForCapture: {
  [key: string]: React.FC<{ templateType: TtemplateType }>;
} = {
  "쇼핑몰-메인": (props) => (
    <ShoppingMallMain templateType={props.templateType} />
  ),
  "쇼핑몰-상품목록": (props) => (
    <ShoppingMallProductList templateType={props.templateType} />
  ),
  "쇼핑몰-상품상세": (props) => (
    <ShoppingMallProductDetail templateType={props.templateType} />
  ),
  "쇼핑몰-주문목록": (props) => (
    <ShoppingMallOrderList templateType={props.templateType} />
  ),
  "쇼핑몰-장바구니": (props) => (
    <ShoppingMallCart templateType={props.templateType} />
  ),
  "쇼핑몰-공지사항": (props) => (
    <ShoppingMallNotice templateType={props.templateType} />
  ),
  "쇼핑몰-로그인": (props) => (
    <ShoppingMallLogin templateType={props.templateType} />
  ),
  "쇼핑몰-회원가입": (props) => (
    <ShoppingMallJoin templateType={props.templateType} />
  ),
  "쇼핑몰-회원탈퇴": (props) => (
    <ShoppingMallWidthDrawer templateType={props.templateType} />
  ),
  "쇼핑몰-아이디찾기": (props) => (
    <ShoppingMallFindId templateType={props.templateType} />
  ),
  "쇼핑몰-비밀번호찾기": (props) => (
    <ShoppingMallFindPw templateType={props.templateType} />
  ),
  "쇼핑몰-브랜드소개": (props) => (
    <ShoppingMallBrandIntroduce templateType={props.templateType} />
  ),
};
