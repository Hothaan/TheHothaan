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
import Notice from "@components/template/board/Notice";

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
        <p css={title}>shppingMall notice page</p>
        <Header />
        <Notice />
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
