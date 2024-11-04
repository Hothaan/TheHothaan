/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Mainbanner from "@components/template/shoppingMall/Mainbanner";
import Header from "@components/template/shoppingMall/Header";
import ProductList from "@components/template/shoppingMall/ProductList";
import Review from "@components/template/shoppingMall/Review";

export default function TemplateComponentGuidePage() {
  const mainbanner = {
    title: "메인 배너",
    desc: "메인 배너 설명입니다.",
  };
  return (
    <div>
      <div css={container}>
        <p css={title}>Main banner</p>
        <Mainbanner {...mainbanner} />
      </div>
      <div css={container}>
        <p css={title}>header</p>
        <Header />
      </div>
      <div css={container}>
        <p css={title}>product list</p>
        <ProductList />
      </div>
      <div css={container}>
        <p css={title}>review</p>
        <Review />
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
