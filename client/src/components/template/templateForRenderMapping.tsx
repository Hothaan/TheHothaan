import React from "react";
import ShoppingMallMain from "./templateStructureForRender/shoppingMall/ShoppingMallMain";
import ShoppingMallProductList from "./templateStructureForRender/shoppingMall/ShoppingMallProductList";
import ShoppingMallProductDetail from "./templateStructureForRender/shoppingMall/ShoppingMallProductDetail";
import ShoppingMallCart from "./templateStructureForRender/shoppingMall/ShoppingMallCart";
import ShoppingMallOrderList from "./templateStructureForRender/shoppingMall/ShoppingMallOrderList";
import ShoppingMallFindId from "./templateStructureForRender/shoppingMall/ShoppingMallFindId";
import ShoppingMallFindPw from "./templateStructureForRender/shoppingMall/ShoppingMallFindPw";
import ShoppingMallJoin from "./templateStructureForRender/shoppingMall/ShoppingMall.Join";
import ShoppingMallLogin from "./templateStructureForRender/shoppingMall/ShoppingMallLogin";
import ShoppingMallNotice from "./templateStructureForRender/shoppingMall/ShoppingMallNotice";
import ShoppingMallWidthDrawer from "./templateStructureForRender/shoppingMall/ShoppingMallWidthDrawer";

export const templateMapForRender: { [key: string]: React.FC<any> } = {
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
