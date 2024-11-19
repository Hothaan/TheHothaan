import React from "react";
import shoppingMallMain from "./templateStructure/shoppingMall/ShoppingMallMain";
import ShoppingMallProductList from "./templateStructure/shoppingMall/ShoppingMallProductList";
import ShoppingMallProductDetail from "./templateStructure/shoppingMall/ShoppingMallProductDetail";
import ShoppingMallCart from "./templateStructure/shoppingMall/ShoppingMallCart";
import ShoppingMallOrderList from "./templateStructure/shoppingMall/ShoppingMallOrderList";
import ShoppingMallFindId from "./templateStructure/shoppingMall/ShoppingMallFindId";
import ShoppingMallFindPw from "./templateStructure/shoppingMall/ShoppingMallFindPw";
import ShoppingMallJoin from "./templateStructure/shoppingMall/ShoppingMall.Join";
import ShoppingMallLogin from "./templateStructure/shoppingMall/ShoppingMallLogin";
import ShoppingMallNotice from "./templateStructure/shoppingMall/ShoppingMallNotice";
import ShoppingMallWidthDrawer from "./templateStructure/shoppingMall/ShoppingMallWidthDrawer";

export const templateMap: { [key: string]: React.FC<any> } = {
  "쇼핑몰-메인": shoppingMallMain,
  "쇼핑몰-상품 목록": ShoppingMallProductList,
  "쇼핑몰-상품 상세": ShoppingMallProductDetail,
  "쇼핑몰-주문 목록": ShoppingMallOrderList,
  "쇼핑몰-장바구니": ShoppingMallCart,
  "쇼핑몰-공지사항": ShoppingMallNotice,
  "쇼핑몰-로그인": ShoppingMallLogin,
  "쇼핑몰-회원가입": ShoppingMallJoin,
  "쇼핑몰-회원탈퇴": ShoppingMallWidthDrawer,
  "쇼핑몰-아이디 찾기": ShoppingMallFindId,
  "쇼핑몰-비밀번호 찾기": ShoppingMallFindPw,
};
