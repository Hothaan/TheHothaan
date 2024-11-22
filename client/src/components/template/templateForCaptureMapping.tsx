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
import { TtemplateMode } from "./types";

export const templateMapForCapture: {
  [key: string]: React.FC<{ templateMode: TtemplateMode }>;
} = {
  "쇼핑몰-메인": (props) => (
    <ShoppingMallMain templateMode={props.templateMode} />
  ),
  "쇼핑몰-상품목록": (props) => (
    <ShoppingMallProductList templateMode={props.templateMode} />
  ),
  "쇼핑몰-상품상세": (props) => (
    <ShoppingMallProductDetail templateMode={props.templateMode} />
  ),
  "쇼핑몰-주문목록": (props) => (
    <ShoppingMallOrderList templateMode={props.templateMode} />
  ),
  "쇼핑몰-장바구니": (props) => (
    <ShoppingMallCart templateMode={props.templateMode} />
  ),
  "쇼핑몰-공지사항": (props) => (
    <ShoppingMallNotice templateMode={props.templateMode} />
  ),
  "쇼핑몰-로그인": (props) => (
    <ShoppingMallLogin templateMode={props.templateMode} />
  ),
  "쇼핑몰-회원가입": (props) => (
    <ShoppingMallJoin templateMode={props.templateMode} />
  ),
  "쇼핑몰-회원탈퇴": (props) => (
    <ShoppingMallWidthDrawer templateMode={props.templateMode} />
  ),
  "쇼핑몰-아이디찾기": (props) => (
    <ShoppingMallFindId templateMode={props.templateMode} />
  ),
  "쇼핑몰-비밀번호찾기": (props) => (
    <ShoppingMallFindPw templateMode={props.templateMode} />
  ),
};
