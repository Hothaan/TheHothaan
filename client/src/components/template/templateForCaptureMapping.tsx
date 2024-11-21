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

export const templateMapForCapture: { [key: string]: React.FC<any> } = {
  "쇼핑몰-메인": ShoppingMallMain,
  "쇼핑몰-상품목록": ShoppingMallProductList,
  "쇼핑몰-상품상세": ShoppingMallProductDetail,
  "쇼핑몰-주문목록": ShoppingMallOrderList,
  "쇼핑몰-장바구니": ShoppingMallCart,
  "쇼핑몰-공지사항": ShoppingMallNotice,
  "쇼핑몰-로그인": ShoppingMallLogin,
  "쇼핑몰-회원가입": ShoppingMallJoin,
  "쇼핑몰-회원탈퇴": ShoppingMallWidthDrawer,
  "쇼핑몰-아이디찾기": ShoppingMallFindId,
  "쇼핑몰-비밀번호찾기": ShoppingMallFindPw,
};
