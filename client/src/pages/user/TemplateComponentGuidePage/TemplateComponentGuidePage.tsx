/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Mainbanner from "@components/template/main/Mainbanner";
import Header from "@components/template/common/header/Header";
import ProductListMain from "@components/template/main/ProductList";
import ProductList from "@components/template/product/ProductList";
import ProductDetail from "@components/template/product/ProductDetail";
import Review from "@components/template/product/Review";
import Footer from "@components/template/common/footer/Footer";
import ServiceIntroduction from "@components/template/service/ServiceIntroduction";
import ServiceContact from "@components/template/service/ServiceContact";
import Notice from "@components/template/customerService/Notice";
import OrderList from "@components/template/mypage/OrderList";
import Cart from "@components/template/mypage/Cart";
import WithDrawer from "@components/template/mypage/WithDrawer";
import Login from "@components/template/utility/Login";
import Join from "@components/template/utility/Join";
import FindId from "@components/template/utility/FindId";
import FindPw from "@components/template/utility/FindPw";

export default function TemplateComponentGuidePage() {
  const mainbanner = {
    title: "Headline H1",
    desc: "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non",
  };
  return (
    <div>
      <div css={container}>
        <p css={title}>shppingMall main page</p>
        <Header />
        <Mainbanner {...mainbanner} />
        <ProductListMain option="main" />
        <Review />
        <ServiceIntroduction />
        <ProductListMain option="list" />
        <ServiceContact />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall product list page</p>
        <Header />
        <ProductList />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall product detail page</p>
        <Header />
        <ProductDetail />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall notice page(option: text)</p>
        <Header />
        <Notice option="text" />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall notice page(option: image)</p>
        <Header />
        <Notice option="image" />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall order list page</p>
        <Header />
        <OrderList />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall cart page</p>
        <Header />
        <Cart />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall withDrawer page</p>
        <Header />
        <WithDrawer />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall login page(option: default)</p>
        <Header />
        <Login option="default" />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall login page(option: snsLogin)</p>
        <Header />
        <Login option="snsLogin" />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall Join page</p>
        <Header />
        <Join />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall FindId page</p>
        <Header />
        <FindId />
        <Footer />
      </div>
      <div css={container}>
        <p css={title}>shppingMall FindPw page</p>
        <Header />
        <FindPw />
        <Footer />
      </div>
    </div>
  );
}

const container = css`
  width: 100%;
  margin-bottom: 24px;
`;

const title = css`
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 16px;
`;
