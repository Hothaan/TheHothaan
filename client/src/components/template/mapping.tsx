import React from "react";
//공통
import Header from "./common/header/Header";
import Footer from "./common/footer/Footer";
//메인
import Mainbanner from "./main/Mainbanner";
import ProductListMain from "./main/ProductListMain";
//상품
import ProductDetail from "./product/ProductDetail";
import ProductList from "./product/ProductList";
import Review from "./product/Review";
//마이페이지
import Cart from "./mypage/Cart";
import OrderList from "./mypage/OrderList";
import WithDrawer from "./mypage/WithDrawer";
//유틸리티
import FindId from "./utility/FindId";
import FindPw from "./utility/FindPw";
import Join from "./utility/Join";
import Login from "./utility/Login";
//서비스
import ServiceContact from "./service/ServiceContact";
import ServiceIntroduction from "./service/ServiceIntroduction";
//고객센터
import Notice from "./customerService/Notice";

export const componentMap: { [key: string]: React.FC<any> } = {
  //공통
  Header: Header,
  Footer: Footer,
  //메인
  mainBanner: Mainbanner,
  ProductListMain: ProductListMain,
  //상품
  ProductDetail: ProductDetail,
  ProductList: ProductList,
  Review: Review,
  //마이페이지
  Cart: Cart,
  OrderList: OrderList,
  WithDrawer: WithDrawer,
  //유틸리티
  FindId: FindId,
  FindPw: FindPw,
  Join: Join,
  Login: Login,
  //서비스
  ServiceContact: ServiceContact,
  ServiceIntroduction: ServiceIntroduction,
  //고객센터
  Notice: Notice,
};
